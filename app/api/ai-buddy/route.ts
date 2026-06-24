import { NextRequest, NextResponse } from 'next/server'

type Message = { role: 'user' | 'buddy'; content: string }

// Rule-based AI engine — no API key required
// Swap to OpenAI/Gemini by setting AI_PROVIDER env var
function generateResponse(message: string, history: Message[]): { response: string; suggestions?: string[] } {
  const lower = message.toLowerCase()

  // Career
  if (lower.includes('career') || lower.includes('stream') || lower.includes('engineering') || lower.includes('medical')) {
    return {
      response: "Great question about career! 🎯 Based on what I know about you, here are some thoughts:\n\n• If you enjoy problem-solving and technology → Engineering or Computer Science might be a great fit\n• If you're passionate about helping people → Medicine or Psychology\n• If you love creativity → Design, Architecture, or Arts\n\nWould you like to take our Career Assessment for a personalized roadmap?",
      suggestions: ['Take career assessment', 'Explore Engineering', 'Book career counsellor', 'Show career roadmap'],
    }
  }

  // Mood / mental health
  if (lower.includes('sad') || lower.includes('stress') || lower.includes('anxious') || lower.includes('anxiety') || lower.includes('depressed') || lower.includes('worried')) {
    return {
      response: "I hear you, and I'm really glad you shared that with me. 💙 It's completely okay to feel this way — you're not alone.\n\nHere are some things that might help right now:\n• Take 5 deep breaths with me — in for 4, hold for 4, out for 4\n• Log your mood in the Mood Tracker\n• Read one of our wellness articles\n• Or book a session with a counsellor — they're here for you\n\nYou're brave for reaching out. 🌱",
      suggestions: ['Log my mood', 'Breathing exercise', 'Book counsellor', 'Read wellness articles'],
    }
  }

  // Study / exam
  if (lower.includes('study') || lower.includes('exam') || lower.includes('board') || lower.includes('homework') || lower.includes('tutor')) {
    return {
      response: "Let's build a winning study plan! 📚\n\nHere's what I recommend:\n• Study in 25-min Pomodoro sessions with 5-min breaks\n• Prioritize weak subjects in the morning when focus is high\n• Review yesterday's notes for 10 mins before each new topic\n• Use active recall — test yourself rather than just reading\n\nWould you like to book a tutor for personalized help?",
      suggestions: ['Book a tutor', 'View my study goals', 'Find resources', 'Set study reminder'],
    }
  }

  // Session booking
  if (lower.includes('book') || lower.includes('session') || lower.includes('appointment') || lower.includes('counsellor')) {
    return {
      response: "Booking a session is a great step! 🌟 Here's how it works:\n\n1. Browse our verified counsellors\n2. Filter by specialization, language, or price\n3. Pick a date and time that works for you\n4. Pay securely and get your meeting link instantly\n\nWould you like me to show you available counsellors right now?",
      suggestions: ['Browse counsellors', 'See my upcoming sessions', 'Book a tutor instead'],
    }
  }

  // Motivation
  if (lower.includes('motivat') || lower.includes('give up') || lower.includes('can\'t do') || lower.includes('hopeless')) {
    return {
      response: "Hey — you can do this. 💪 Every expert was once a beginner, and every champion had moments of doubt.\n\n✨ Today's reminder: Progress, not perfection. One step at a time is still moving forward.\n\nYour wellness score shows you've been consistent. That's something to be proud of!\n\nWhat small win can you achieve today?",
      suggestions: ['Check my progress', 'Read motivational blogs', 'Talk to a counsellor'],
    }
  }

  // Resources
  if (lower.includes('resource') || lower.includes('article') || lower.includes('blog') || lower.includes('read')) {
    return {
      response: "Great! Our resource library has tons of helpful content. 📖\n\nTop picks for you:\n• 'How to Manage Exam Stress' — 5 min read\n• 'Career Exploration Guide for Teens' — 8 min read\n• 'Building Healthy Study Habits' — 6 min read\n• 'Understanding Your Emotions' — 7 min read",
      suggestions: ['Open resource library', 'Read blogs', 'Watch videos'],
    }
  }

  // Greeting
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('good morning') || lower.includes('good afternoon')) {
    return {
      response: "Hey there! 😊 So great to chat with you today! I'm your AI Buddy — here to support your journey at Teens Helpline.\n\nWhat's on your mind today? I can help with:",
      suggestions: ['Career guidance', 'Study planning', 'Book a session', 'I need support'],
    }
  }

  // Default / fallback
  return {
    response: "That's interesting! 🤔 I'm always learning to help you better.\n\nHere are some things I can definitely help you with right now:",
    suggestions: ['Career guidance', 'Study planner', 'Book counsellor', 'Mood support'],
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // If external AI is configured, use it
    const provider = process.env.AI_PROVIDER || 'rule-based'

    if (provider === 'openai' && process.env.OPENAI_API_KEY) {
      // OpenAI integration placeholder
      // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
      // const response = await openai.chat.completions.create(...)
    }

    // Default: rule-based engine
    const result = generateResponse(message, history || [])

    // Simulate slight delay for natural feel
    await new Promise((resolve) => setTimeout(resolve, 600 + Math.random() * 800))

    return NextResponse.json(result)
  } catch (error) {
    console.error('AI Buddy error:', error)
    return NextResponse.json(
      { response: "I'm having a moment! Please try again. 💙", suggestions: [] },
      { status: 200 }
    )
  }
}
