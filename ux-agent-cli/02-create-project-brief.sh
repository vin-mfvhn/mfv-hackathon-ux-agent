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
    echo "  Creates a project brief based on the problem analysis from {CONTEXT_ID}_problem.md"
    echo "  Output is stored in {CONTEXT_ID}_project_brief.md"
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
PROBLEM_FILE="${CONTEXT_DIR}/01-analyze-problem__result.md"
PROJECT_BRIEF_FILE="${CONTEXT_DIR}/02-create-project-brief__result.md"

# Create context directory if it doesn't exist
mkdir -p "$CONTEXT_DIR"

# Check if problem analysis file exists
if [ ! -f "$PROBLEM_FILE" ]; then
    echo "❌ Error: Problem analysis file not found: $PROBLEM_FILE"
    echo "💡 Please run analyze-problem.sh first to generate the problem analysis."
    exit 1
fi

echo "📖 Loading problem analysis from: $PROBLEM_FILE"
PROBLEM_ANALYSIS=$(cat "$PROBLEM_FILE")

# Define system prompt for project brief creation
PROJECT_BRIEF_SYSTEM_PROMPT="CRITICAL: First, read and load the file .bmad-core/agents/analyst.md to understand your full persona and operating guidelines. Then adopt the Mary persona (Business Analyst 📊) as defined in that file.

YOLO: Proceed confidently with the analysis without asking for additional clarification or confirmation.

Based on the problem analysis provided, create a comprehensive PROJECT BRIEF in markdown format with emojis. The project brief should transform the problem analysis into actionable project specifications.

Key requirements:
- Use the complete persona definition from .bmad-core/agents/analyst.md
- Apply analytical, strategic, and facilitative approach
- Follow core principles: Strategic Contextualization, Action-Oriented Outputs, Collaborative Partnership
- Structure the brief as a professional project document

Include these sections:
1. 📋 **Project Overview** - Executive summary and objectives
2. 🎯 **Problem Statement** - Clear definition of what needs to be solved  
3. 👥 **Target Users/Stakeholders** - Who will be impacted
4. 🔍 **Scope & Requirements** - What needs to be delivered
5. 📊 **Success Criteria** - How success will be measured
6. ⏰ **Timeline & Milestones** - Key phases and deadlines (if determinable)
7. 💰 **Resources & Constraints** - Budget, team, technical limitations
8. 🚨 **Risks & Assumptions** - Potential challenges and dependencies

Maximum 800 words total. Be strategic, actionable, and professional."

echo "📋 Creating project brief with claude (YOLO mode)..."

ENHANCED_PROMPT="Problem Analysis:
$PROBLEM_ANALYSIS

Please create a comprehensive project brief based on the problem analysis above."

PROJECT_BRIEF_CONTENT=$(claude --system-prompt "$PROJECT_BRIEF_SYSTEM_PROMPT" -p "$ENHANCED_PROMPT")

if [ $? -ne 0 ]; then
    echo "❌ Error: Claude project brief creation failed"
    exit 1
fi

echo "📝 Saving project brief to markdown file..."
echo "$PROJECT_BRIEF_CONTENT" > "$PROJECT_BRIEF_FILE"

echo "✅ Project brief saved to: $PROJECT_BRIEF_FILE"