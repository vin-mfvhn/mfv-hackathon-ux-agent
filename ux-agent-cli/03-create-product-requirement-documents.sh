#!/bin/bash

# Initialize variables
CONTEXT_ID=""

# Function to display usage
show_usage() {
    echo "📋 Usage: $0 -c|--context-id \"CONTEXT_ID\""
    echo "  -c, --context-id   🏷️  Unique identifier for context and result files"
    echo "  -h, --help         ❓ Show this help message"
    echo ""
    echo "Description:"
    echo "  Creates product requirement documents based on the project brief from {CONTEXT_ID}_project_brief.md"
    echo "  Output is stored in {CONTEXT_ID}_prd.md"
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
PROJECT_BRIEF_FILE="${CONTEXT_DIR}/02-create-project-brief__result.md"
PRD_FILE="${CONTEXT_DIR}/03-create-product-requirement-documents__result.md"

# Create context directory if it doesn't exist
mkdir -p "$CONTEXT_DIR"

# Check if project brief file exists
if [ ! -f "$PROJECT_BRIEF_FILE" ]; then
    echo "❌ Error: Project brief file not found: $PROJECT_BRIEF_FILE"
    echo "💡 Please run create-project-brief.sh first to generate the project brief."
    exit 1
fi

echo "📖 Loading project brief from: $PROJECT_BRIEF_FILE"
PROJECT_BRIEF=$(cat "$PROJECT_BRIEF_FILE")

# Define system prompt for PRD creation
PRD_SYSTEM_PROMPT="CRITICAL: First, read and load the file .bmad-core/agents/pm.md to understand your full persona and operating guidelines. Then adopt the PM persona (Product Manager 📋) as defined in that file.

YOLO: Proceed confidently with the analysis without asking for additional clarification or confirmation.

Based on the project brief provided, create comprehensive PRODUCT REQUIREMENT DOCUMENTS (PRD) in markdown format with emojis. The PRD should transform the project brief into detailed product specifications and requirements.

Key requirements:
- Use the complete persona definition from .bmad-core/agents/pm.md
- Apply product management methodology and strategic thinking
- Follow core principles defined in the PM agent file
- Structure the PRD as a professional product document

Include these sections:
1. 📋 **Executive Summary** - High-level overview and objectives
2. 🎯 **Product Vision & Goals** - Vision statement and success metrics
3. 👥 **User Personas & Use Cases** - Target users and their scenarios
4. 🔍 **Feature Requirements** - Detailed functional requirements
5. 🎨 **User Experience Requirements** - UI/UX specifications
6. ⚡ **Technical Requirements** - System and technical constraints
7. 📊 **Acceptance Criteria** - Definition of done for each feature
8. ⏰ **Release Planning** - Phases, milestones, and timeline
9. 🚨 **Risk Assessment** - Potential risks and mitigation strategies
10. 📈 **Success Metrics** - KPIs and measurement criteria

Maximum 1000 words total. Be detailed, actionable, and product-focused."

echo "📋 Creating product requirement documents with claude..."

ENHANCED_PROMPT="Project Brief:
$PROJECT_BRIEF

Please create comprehensive product requirement documents based on the project brief above."

PRD_CONTENT=$(claude --system-prompt "$PRD_SYSTEM_PROMPT" -p "$ENHANCED_PROMPT")

if [ $? -ne 0 ]; then
    echo "❌ Error: Claude PRD creation failed"
    exit 1
fi

echo "📝 Saving PRD to markdown file..."
echo "$PRD_CONTENT" > "$PRD_FILE"

echo "✅ Product requirement documents saved to: $PRD_FILE"