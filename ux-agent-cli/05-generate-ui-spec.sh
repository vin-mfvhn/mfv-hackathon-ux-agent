#!/bin/bash

# Initialize variables
CONTEXT_ID=""

# Function to display usage
show_usage() {
    echo "🎨 Usage: $0 -c|--context-id \"CONTEXT_ID\""
    echo "  -c, --context-id   🏷️  Unique identifier for context and result files"
    echo "  -h, --help         ❓ Show this help message"
    echo ""
    echo "Description:"
    echo "  Generates UI spec based on the tickets from {CONTEXT_ID} folder"
    echo "  Output is stored in {CONTEXT_ID}_ui_spec.md"
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
TICKETS_FILES=$(find "$CONTEXT_DIR" -name "04-create-tickets__epic_*__userstory__*.md" 2>/dev/null)
SOLUTION_FILE="${CONTEXT_DIR}/05-generate-ui-spec__result.md"

# Create context directory if it doesn't exist
mkdir -p "$CONTEXT_DIR"

# Check if tickets files exist
if [ -z "$TICKETS_FILES" ]; then
    echo "❌ Error: No tickets files found in: $CONTEXT_DIR"
    echo "💡 Please run create-tickets.sh first to generate the tickets."
    exit 1
fi

echo "📖 Loading tickets from: $CONTEXT_DIR"

# Process each ticket file individually
for ticket_file in $TICKETS_FILES; do
    if [ -f "$ticket_file" ]; then
        filename=$(basename "$ticket_file")
        echo "  📋 Processing: $filename"
        
        # Extract epic and user story numbers from filename
        if [[ $filename =~ 04-create-tickets__epic_([0-9]+)__userstory__([0-9]+)\.md ]]; then
            epic_number="${BASH_REMATCH[1]}"
            story_number="${BASH_REMATCH[2]}"
            
            echo "    🎯 Generating UI spec for Epic $epic_number, User Story $story_number"
            
            # Read ticket content
            TICKET_CONTENT=$(cat "$ticket_file")
            
            # Define output file for this specific ticket
            SPEC_OUTPUT_FILE="${CONTEXT_DIR}/05-generate-ui-spec__epic_${epic_number}__userstory__${story_number}.md"
            
            # Define system prompt for UI specification creation
            SOLUTION_SYSTEM_PROMPT="CRITICAL: First, read and load the file .bmad-core/agents/mfui-ux-expert.md to understand your full persona and operating guidelines. Then adopt the Maya persona (MFUI UX Expert 🎨💰) as defined in that file.

YOLO: Proceed confidently with the analysis without asking for additional clarification or confirmation.

Based on the epic and user story provided, create a focused UI SPECIFICATION in markdown format with emojis. The specification should provide detailed UI/UX implementation guidance for this specific user story.

Key requirements:
- Use the complete persona definition from .bmad-core/agents/mfui-ux-expert.md
- Apply all core principles from the agent file
- Focus on MFUI component recommendations and LA Frontend patterns
- Be systematic, component-focused, and MoneyForward-centric
- Provide practical, actionable solutions for rapid prototyping

Include these sections for this user story:
1. 🎯 **User Story Summary** - Brief recap of the story
2. 🎨 **UI Design Approach** - Visual design strategy
3. 🧩 **MFUI Components** - Specific components to use
4. 📱 **Responsive Behavior** - Mobile and desktop considerations
5. 🎭 **User Interaction Flow** - Step-by-step user journey
6. 📋 **Component Configuration** - Detailed component setup
7. 🔧 **Implementation Notes** - Technical integration details
8. ✅ **Acceptance Criteria** - UI-specific completion criteria

Maximum 800 words total. Be focused, component-specific, and implementation-ready."

            echo "    🎨 Creating UI specification with claude..."
            
            ENHANCED_PROMPT="Epic and User Story:
$TICKET_CONTENT

Please create a focused UI specification for this specific user story."

            SOLUTION_CONTENT=$(claude --system-prompt "$SOLUTION_SYSTEM_PROMPT" -p "$ENHANCED_PROMPT")

            if [ $? -ne 0 ]; then
                echo "    ❌ Error: Claude UI specification generation failed for Epic $epic_number, User Story $story_number"
                continue
            fi

            echo "    📝 Saving UI specification to: $SPEC_OUTPUT_FILE"
            echo "$SOLUTION_CONTENT" > "$SPEC_OUTPUT_FILE"
            echo "    ✅ UI specification saved for Epic $epic_number, User Story $story_number"
        else
            echo "    ⚠️  Warning: Could not parse filename: $filename"
        fi
    fi
done

echo "✅ All UI specifications generated successfully in: $CONTEXT_DIR"