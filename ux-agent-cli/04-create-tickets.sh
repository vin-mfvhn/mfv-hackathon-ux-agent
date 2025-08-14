#!/bin/bash

# Initialize variables
CONTEXT_ID=""

# Function to display usage
show_usage() {
    echo "🎫 Usage: $0 -c|--context-id \"CONTEXT_ID\""
    echo "  -c, --context-id   🏷️  Unique identifier for context and result files"
    echo "  -h, --help         ❓ Show this help message"
    echo ""
    echo "Description:"
    echo "  Creates epics and user stories based on the PRD from {CONTEXT_ID}_prd.md"
    echo "  Output is stored in separate files: 04-create-tickets__epic_{EPIC_NUMBER}__userstory__{USER_STORY_NUMBER}.md"
    echo ""
    echo "Example:"
    echo "  $0 -c \"login_001\""
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -c|--context-id)
            CONTEXT_ID="$2"
            shift 2
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            echo "❌ Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Validate required parameters
if [ -z "$CONTEXT_ID" ]; then
    echo "❌ Error: Context ID is required"
    show_usage
    exit 1
fi

# Define file paths
CONTEXT_DIR="ux-agent-result/${CONTEXT_ID}"
PRD_FILE="${CONTEXT_DIR}/03-create-product-requirement-documents__result.md"

# Create context directory if it doesn't exist
mkdir -p "$CONTEXT_DIR"

# Check if PRD file exists
if [ ! -f "$PRD_FILE" ]; then
    echo "❌ Error: Product requirement documents file not found: $PRD_FILE"
    echo "💡 Please run create-product-requirement-documents.sh first to generate the PRD."
    exit 1
fi

echo "📖 Loading PRD from: $PRD_FILE"
PRD_CONTENT=$(cat "$PRD_FILE")

# Define system prompt for tickets creation
TICKETS_SYSTEM_PROMPT="CRITICAL: First, read and load the file .bmad-core/agents/pm.md to understand your full persona and operating guidelines. Then adopt the PM persona (Product Manager 📋) as defined in that file.

YOLO: Proceed confidently with the analysis without asking for additional clarification or confirmation.

Based on the Product Requirement Documents provided, create EPICS and USER STORIES in markdown format with emojis. Break down the PRD into manageable development tickets.

Key requirements:
- Use the complete persona definition from .bmad-core/agents/pm.md
- Apply agile methodology and story mapping techniques
- Follow core principles defined in the PM agent file
- Structure each epic and user story as development-ready tickets

For each Epic, provide:
1. 🎯 **Epic Title** - Clear, concise epic name
2. 📋 **Epic Description** - What this epic achieves
3. 🎨 **User Stories** - List of user stories within this epic
4. ✅ **Acceptance Criteria** - High-level epic completion criteria
5. 📊 **Success Metrics** - How to measure epic success

For each User Story within an epic, provide:
1. 🎫 **Story Title** - Clear, actionable story title
2. 👤 **As a [user type]** - User persona
3. 🎯 **I want [functionality]** - Desired capability  
4. 💡 **So that [benefit]** - Business value
5. ✅ **Acceptance Criteria** - Specific completion criteria
6. 🔍 **Definition of Done** - Technical and quality requirements
7. 📏 **Story Points** - Estimated effort (1, 2, 3, 5, 8, 13)

IMPORTANT OUTPUT FORMAT:
- Start with '=== EPIC [NUMBER]: [TITLE] ===' for each epic
- Follow with '--- USER STORY [EPIC.STORY]: [TITLE] ---' for each user story
- Use clear separators between epics and stories
- Maximum 3-5 epics, 2-4 user stories per epic

Be detailed, development-focused, and ensure stories are implementable."

echo "🎫 Creating epics and user stories with claude..."

ENHANCED_PROMPT="Product Requirement Documents:
$PRD_CONTENT

Please create epics and their user stories based on the PRD above. Format the output with clear separators so each epic and user story can be extracted to separate files."

TICKETS_CONTENT=$(claude --system-prompt "$TICKETS_SYSTEM_PROMPT" -p "$ENHANCED_PROMPT")

if [ $? -ne 0 ]; then
    echo "❌ Error: Claude tickets creation failed"
    exit 1
fi

echo "📝 Processing and saving tickets to separate files..."

# Save full content for debugging
FULL_TICKETS_FILE="${CONTEXT_DIR}/04-create-tickets__full_output.md"
echo "$TICKETS_CONTENT" > "$FULL_TICKETS_FILE"

# Extract epics and user stories
EPIC_NUMBER=1
current_epic=""
current_story=""
current_epic_number=""
current_story_number=""

echo "$TICKETS_CONTENT" | while IFS= read -r line; do
    if [[ $line =~ ^===\ EPIC\ ([0-9]+):\ (.*)\ ===$ ]]; then
        # New epic found
        current_epic_number="${BASH_REMATCH[1]}"
        epic_title="${BASH_REMATCH[2]}"
        current_epic="=== EPIC ${current_epic_number}: ${epic_title} ==="$'\n'
        current_story=""
        current_story_number=""
        echo "📋 Found Epic ${current_epic_number}: ${epic_title}"
        
    elif [[ $line =~ ^---\ USER\ STORY\ ([0-9]+\.[0-9]+):\ (.*)\ ---$ ]]; then
        # Save previous user story if exists
        if [ -n "$current_story" ] && [ -n "$current_epic_number" ] && [ -n "$current_story_number" ]; then
            story_file="${CONTEXT_DIR}/04-create-tickets__epic_${current_epic_number}__userstory__${current_story_number}.md"
            echo -e "${current_epic}\n${current_story}" > "$story_file"
            echo "📝 Saved user story to: $story_file"
        fi
        
        # New user story found
        current_story_number="${BASH_REMATCH[1]#*.}"
        story_title="${BASH_REMATCH[2]}"
        current_story="--- USER STORY ${BASH_REMATCH[1]}: ${story_title} ---"$'\n'
        echo "  🎫 Found User Story ${BASH_REMATCH[1]}: ${story_title}"
        
    else
        # Add line to current story
        if [ -n "$current_story" ]; then
            current_story+="$line"$'\n'
        else
            current_epic+="$line"$'\n'
        fi
    fi
done

# Handle the last user story
if [ -n "$current_story" ] && [ -n "$current_epic_number" ] && [ -n "$current_story_number" ]; then
    story_file="${CONTEXT_DIR}/04-create-tickets__epic_${current_epic_number}__userstory__${current_story_number}.md"
    echo -e "${current_epic}\n${current_story}" > "$story_file"
    echo "📝 Saved user story to: $story_file"
fi

echo "✅ Full tickets output saved to: $FULL_TICKETS_FILE"
echo "✅ Individual epic and user story files created in: $CONTEXT_DIR"