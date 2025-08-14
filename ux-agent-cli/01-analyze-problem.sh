#!/bin/bash

# Initialize variables
USER_PROMPT=""
CONTEXT_ID=""
ENHANCEMENT=""

# Function to display usage
show_usage() {
    echo "🔍 Usage: $0 -p|--prompt \"USER_PROMPT\" -c|--context-id \"CONTEXT_ID\" [--enhancement \"ENHANCEMENT\"]"
    echo "  -p, --prompt       📝 The prompt to analyze for problems"
    echo "  -c, --context-id   🏷️  Unique identifier for context and result files"
    echo "      --enhancement  ✨ Additional information to enhance the analysis (optional)"
    echo "  -h, --help         ❓ Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 -p \"Design a login form\" -c \"login_001\""
    echo "  $0 -p \"Design a login form\" -c \"login_001\" --enhancement \"Target users are enterprise customers\""
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -p|--prompt)
            USER_PROMPT="$2"
            shift 2
            ;;
        -c|--context-id)
            CONTEXT_ID="$2"
            shift 2
            ;;
        --enhancement)
            ENHANCEMENT="$2"
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

# When enhancement is provided, we don't need USER_PROMPT (we'll load from previous analysis)
if [ -z "$ENHANCEMENT" ] && [ -z "$USER_PROMPT" ]; then
    echo "❌ Error: Either user prompt or enhancement is required"
    show_usage
    exit 1
fi

PROBLEM_SYSTEM_PROMPT="CRITICAL: First, read and load the file .bmad-core/agents/analyst.md to understand your full persona and operating guidelines. Then adopt the Mary persona (Business Analyst 📊) as defined in that file.

After loading the agent file, provide a CONCISE problem analysis (maximum 300 words) in markdown format with emojis, following the core principles defined in the analyst.md agent file.

Key requirements:
- Use the complete persona definition from .bmad-core/agents/analyst.md
- Apply analytical, inquisitive, creative, and objective approach
- Follow core principles: Curiosity-Driven Inquiry, Evidence-Based Analysis, Strategic Contextualization
- Focus on: 1) Core UX problems with probing 'why' questions 2) Key user challenges with strategic context 3) Critical requirements with actionable insights
- Be methodical, data-informed, and facilitate clarity"

# Create context directory if it doesn't exist
CONTEXT_DIR="ux-agent-result/${CONTEXT_ID}"
mkdir -p "$CONTEXT_DIR"

OUTPUT_FILE="${CONTEXT_DIR}/01-analyze-problem__result.json"
PROBLEM_FILE="${CONTEXT_DIR}/01-analyze-problem__result.md"
CONTEXT_QUESTION_FILE="${CONTEXT_DIR}/01-analyze-problem__context_questions.md"

echo "🔍 Analyzing problem with claude..."

# Prepare the prompt based on whether enhancement is provided
if [ -n "$ENHANCEMENT" ]; then
    # Load previous problem analysis
    if [ -f "$PROBLEM_FILE" ]; then
        echo "📖 Loading previous problem analysis from: $PROBLEM_FILE"
        PREVIOUS_ANALYSIS=$(cat "$PROBLEM_FILE")
        
        ENHANCED_USER_PROMPT="Previous problem analysis:
$PREVIOUS_ANALYSIS

Additional information provided for refinement:
$ENHANCEMENT

Please reanalyze the problem with this additional information. Provide a refined and more comprehensive problem analysis that incorporates the new information. Focus on how the additional information changes or enhances the understanding of the problem."
        
        echo "✨ Using additional information to refine previous analysis..."
    else
        echo "⚠️  Warning: Previous problem analysis file not found. Using enhancement as new analysis."
        ENHANCED_USER_PROMPT="Additional information provided: $ENHANCEMENT

Please analyze the problem based on this information."
        echo "✨ Creating new analysis from enhancement information..."
    fi
else
    ENHANCED_USER_PROMPT="$USER_PROMPT"
fi

PROBLEM_CONTENT=$(claude --system-prompt "$PROBLEM_SYSTEM_PROMPT" -p "$ENHANCED_USER_PROMPT")

if [ $? -ne 0 ]; then
    echo "❌ Error: Claude problem analysis failed"
    exit 1
fi

echo "📝 Saving problem analysis to markdown file..."
echo "$PROBLEM_CONTENT" > "$PROBLEM_FILE"

echo "🤔 Assessing confidence level..."
CONFIDENCE_SYSTEM_PROMPT="You are an expert analyst. Review the following problem analysis and determine if there is enough information to provide a confident analysis. 

Respond with ONLY 'true' if the analysis has sufficient context and information, or 'false' if more clarification is needed.

Consider factors like:
- Clarity of user requirements
- Specificity of the problem domain
- Availability of context about users/stakeholders
- Clear business or technical constraints

IMPORTANT: If this analysis has been enhanced with additional information (refinement), give it higher consideration for confidence since it now contains more context than the original analysis."

# Include enhancement context in confidence assessment
if [ -n "$ENHANCEMENT" ]; then
    CONFIDENCE_INPUT="This is a refined analysis based on:
Original analysis refined with additional information: $ENHANCEMENT

Enhanced prompt used: '$ENHANCED_USER_PROMPT'

Refined problem analysis: '$PROBLEM_CONTENT'"
else
    CONFIDENCE_INPUT="User prompt: '$ENHANCED_USER_PROMPT'

Problem analysis: '$PROBLEM_CONTENT'"
fi

CONFIDENCE_RESULT=$(claude --system-prompt "$CONFIDENCE_SYSTEM_PROMPT" -p "$CONFIDENCE_INPUT")

if [ $? -ne 0 ]; then
    echo "❌ Error: Claude confidence assessment failed"
    exit 1
fi

# Clean up the confidence result (remove whitespace and quotes)
CONFIDENT=$(echo "$CONFIDENCE_RESULT" | tr -d ' \n\r"' | tr '[:upper:]' '[:lower:]')

if [ "$CONFIDENT" = "false" ]; then
    echo "❓ Low confidence detected. Generating context questions..."
    
    CONTEXT_QUESTIONS_SYSTEM_PROMPT="CRITICAL: First, read and load the file .bmad-core/agents/analyst.md to understand your full persona and operating guidelines. Then adopt the Mary persona (Business Analyst 📊) as defined in that file.

Based on the user prompt and problem analysis, generate 3-5 specific clarifying questions in markdown format with emojis to gather missing context. Focus on:

1. User personas and target audience
2. Business constraints and goals  
3. Technical requirements and limitations
4. Success criteria and metrics
5. Timeline and resource constraints

Be concise and actionable. Use bullet points or numbered lists."

    CONTEXT_QUESTIONS_CONTENT=$(claude --system-prompt "$CONTEXT_QUESTIONS_SYSTEM_PROMPT" -p "$CONFIDENCE_INPUT")
    
    if [ $? -ne 0 ]; then
        echo "❌ Error: Claude context questions generation failed"
        exit 1
    fi
    
    echo "📋 Saving context questions to markdown file..."
    echo "$CONTEXT_QUESTIONS_CONTENT" > "$CONTEXT_QUESTION_FILE"
else
    echo "✅ High confidence in analysis - no additional context needed"
    CONTEXT_QUESTIONS_CONTENT=""
fi

echo "🔄 Converting markdown to HTML..."
if command -v pandoc &> /dev/null; then
    HTML_PROBLEM_CONTENT=$(pandoc -f markdown -t html "$PROBLEM_FILE")
    if [ "$CONFIDENT" = "false" ] && [ -f "$CONTEXT_QUESTION_FILE" ]; then
        HTML_CONTEXT_QUESTIONS_CONTENT=$(pandoc -f markdown -t html "$CONTEXT_QUESTION_FILE")
    fi
elif command -v markdown &> /dev/null; then
    HTML_PROBLEM_CONTENT=$(markdown "$PROBLEM_FILE")
    if [ "$CONFIDENT" = "false" ] && [ -f "$CONTEXT_QUESTION_FILE" ]; then
        HTML_CONTEXT_QUESTIONS_CONTENT=$(markdown "$CONTEXT_QUESTION_FILE")
    fi
else
    echo "⚠️  Warning: Neither pandoc nor markdown found. Using basic conversion..."
    HTML_PROBLEM_CONTENT=$(echo "$PROBLEM_CONTENT" | sed 's/^# \(.*\)/<h1>\1<\/h1>/' | sed 's/^## \(.*\)/<h2>\1<\/h2>/' | sed 's/^### \(.*\)/<h3>\1<\/h3>/' | sed 's/\*\*\(.*\)\*\*/<strong>\1<\/strong>/g' | sed 's/\*\(.*\)\*/<em>\1<\/em>/g' | sed 's/$/&<br>/')
    if [ "$CONFIDENT" = "false" ] && [ -n "$CONTEXT_QUESTIONS_CONTENT" ]; then
        HTML_CONTEXT_QUESTIONS_CONTENT=$(echo "$CONTEXT_QUESTIONS_CONTENT" | sed 's/^# \(.*\)/<h1>\1<\/h1>/' | sed 's/^## \(.*\)/<h2>\1<\/h2>/' | sed 's/^### \(.*\)/<h3>\1<\/h3>/' | sed 's/\*\*\(.*\)\*\*/<strong>\1<\/strong>/g' | sed 's/\*\(.*\)\*/<em>\1<\/em>/g' | sed 's/$/&<br>/')
    fi
fi

echo "📋 Creating JSON result file..."
# Escape JSON special characters in the content
ESCAPED_USER_PROMPT=$(echo "$ENHANCED_USER_PROMPT" | sed 's/\\/\\\\/g; s/"/\\"/g; s/$/\\n/g' | tr -d '\n' | sed 's/\\n$//')
ESCAPED_HTML_PROBLEM_CONTENT=$(echo "$HTML_PROBLEM_CONTENT" | sed 's/\\/\\\\/g; s/"/\\"/g; s/$/\\n/g' | tr -d '\n' | sed 's/\\n$//')

if [ "$CONFIDENT" = "false" ] && [ -n "$HTML_CONTEXT_QUESTIONS_CONTENT" ]; then
    ESCAPED_HTML_CONTEXT_QUESTIONS_CONTENT=$(echo "$HTML_CONTEXT_QUESTIONS_CONTENT" | sed 's/\\/\\\\/g; s/"/\\"/g; s/$/\\n/g' | tr -d '\n' | sed 's/\\n$//')
    
    cat > "$OUTPUT_FILE" << EOF
{
  "context_id": "$CONTEXT_ID",
  "user_query": "$ESCAPED_USER_PROMPT",
  "problem": "$ESCAPED_HTML_PROBLEM_CONTENT",
  "confident": false,
  "context_question": "$ESCAPED_HTML_CONTEXT_QUESTIONS_CONTENT"
}
EOF
else
    cat > "$OUTPUT_FILE" << EOF
{
  "context_id": "$CONTEXT_ID",
  "user_query": "$ESCAPED_USER_PROMPT",
  "problem": "$ESCAPED_HTML_PROBLEM_CONTENT",
  "confident": true
}
EOF
fi

echo "✅ Problem analysis saved to: $PROBLEM_FILE"
if [ "$CONFIDENT" = "false" ] && [ -f "$CONTEXT_QUESTION_FILE" ]; then
    echo "❓ Context questions saved to: $CONTEXT_QUESTION_FILE"
fi
echo "✅ Result saved to: $OUTPUT_FILE"