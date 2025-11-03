# Planning Guide

Educational awareness tool that helps users recognize manipulative communication patterns through guided information, examples, and self-reflection exercises in a supportive, Hebrew RTL interface.

**Experience Qualities**:
1. **Safe** - Creates a protective environment where users learn without experiencing simulated manipulation
2. **Empowering** - Provides knowledge and resources that strengthen users' ability to recognize harmful patterns
3. **Supportive** - Maintains compassionate tone with clear pathways to professional help and resources

**Complexity Level**: Light Application (multiple features with basic state)
This is an educational tool with screening, informational content stages, example dialogues, and resource links - requiring state management but not complex user accounts or backend persistence.

## Essential Features

### Feature 1: Safety Screening
- **Functionality**: Four-question consent and readiness check with Hebrew text and yes/no buttons
- **Purpose**: Ensures users are emotionally prepared and understand the educational nature of the content
- **Trigger**: Automatic on application load
- **Progression**: Display question → user selects כן or לא → if כן, proceed to next question → if לא on any, show exit message → after 4x כן, proceed to education stage
- **Success criteria**: All four questions answered affirmatively leads to content; any negative answer shows supportive exit message

### Feature 2: Educational Content Display
- **Functionality**: Presents information about recognizing manipulative communication patterns through text cards and example dialogues
- **Purpose**: Educates users about warning signs without exposing them to simulated manipulation
- **Trigger**: Successful completion of screening stage
- **Progression**: Welcome message → information cards → example dialogue review → reflection prompts → resource links
- **Success criteria**: User can read through content at their own pace with clear navigation

### Feature 3: Example Dialogue Viewer
- **Functionality**: Shows pre-written conversation examples highlighting manipulative patterns with annotations
- **Purpose**: Demonstrates patterns in a controlled, educational context with clear labeling
- **Trigger**: User navigates to examples section
- **Progression**: Select example → view annotated dialogue → read pattern explanation → return to menu
- **Success criteria**: Examples clearly illustrate patterns without causing distress

### Feature 4: Resource Directory
- **Functionality**: Provides links to professional support services, hotlines, and additional reading
- **Purpose**: Connects users with appropriate help and further education
- **Trigger**: Accessible from any stage; prominently displayed at end
- **Progression**: View resource card → select resource type → display contact information and links → copy or navigate
- **Success criteria**: All resource links are functional and clearly described

## Edge Case Handling
- **Browser back button**: State persists appropriately; users can return to previous screens
- **Incomplete screening**: Session remembers progress but requires completion to access content
- **Long content**: Proper scrolling with clear visual indicators of more content
- **Network issues**: Graceful degradation; all content loads client-side after initial page load
- **Mobile keyboards**: RTL input fields work correctly; viewport adjusts properly

## Design Direction
The design should feel supportive, professional, and calming - like a trustworthy educational resource. It should balance accessibility with dignity, avoiding both clinical coldness and artificial cheerfulness. A clean, minimal interface serves the serious educational purpose while remaining approachable.

## Color Selection
Complementary (opposite colors) - using warm, supportive tones balanced with calming, trustworthy colors to create a safe, professional feeling.

- **Primary Color**: Deep Purple `oklch(0.45 0.15 300)` - communicates trust, professionalism, and calm authority
- **Secondary Colors**: Soft Lavender `oklch(0.75 0.08 300)` for backgrounds and cards - gentle, non-threatening supporting color
- **Accent Color**: Warm Coral `oklch(0.70 0.15 25)` for important actions and emphasis - draws attention with warmth and care
- **Foreground/Background Pairings**:
  - Background (Soft Cream `oklch(0.98 0.01 60)`): Deep Purple text `oklch(0.35 0.15 300)` - Ratio 8.2:1 ✓
  - Card (White `oklch(1 0 0)`): Deep Purple text `oklch(0.35 0.15 300)` - Ratio 9.8:1 ✓
  - Primary (Deep Purple `oklch(0.45 0.15 300)`): White text `oklch(1 0 0)` - Ratio 7.5:1 ✓
  - Accent (Warm Coral `oklch(0.70 0.15 25)`): Deep Purple text `oklch(0.35 0.15 300)` - Ratio 4.8:1 ✓
  - Muted (Soft Lavender `oklch(0.75 0.08 300)`): Deep Purple text `oklch(0.35 0.15 300)` - Ratio 5.5:1 ✓

## Font Selection
Typography should feel humanistic and accessible - professional without being cold, readable without being childish. Noto Sans Hebrew provides excellent Hebrew support with clean, modern letterforms that maintain dignity.

- **Typographic Hierarchy**:
  - H1 (Main Title): Noto Sans Hebrew Bold/32px/tight letter spacing/-0.5px/1.2 line height
  - H2 (Section Headers): Noto Sans Hebrew SemiBold/24px/normal spacing/1.3 line height
  - H3 (Card Titles): Noto Sans Hebrew Medium/20px/normal spacing/1.4 line height
  - Body (Main Content): Noto Sans Hebrew Regular/16px/normal spacing/1.6 line height
  - Small (Captions): Noto Sans Hebrew Regular/14px/normal spacing/1.5 line height

## Animations
Animations should be minimal and purposeful - gentle transitions that reduce cognitive load and guide attention without distraction. Every motion serves to orient the user or provide feedback, never to entertain.

- **Purposeful Meaning**: Subtle fade-ins for new content communicate progression; gentle scales on buttons provide tactile feedback; smooth height transitions for expanding sections feel natural
- **Hierarchy of Movement**: Question transitions are the primary animated elements (cross-fade, 300ms); button states use minimal scale (1.02x); content sections fade in sequentially

## Component Selection
- **Components**: 
  - Card for all content containers (with shadows for depth)
  - Button for primary actions (כן/לא, navigation) with distinct variants
  - ScrollArea for long content sections
  - Separator for visual section breaks
  - Dialog for exit confirmation if needed
  
- **Customizations**: 
  - RTL-optimized card layouts with proper text alignment
  - Custom Hebrew button text with appropriate padding
  - Progress indicator component for screening stages (4 dots, current highlighted)
  
- **States**: 
  - Buttons: default (gentle shadow), hover (slight lift + shadow increase), active (scale down slightly), disabled (reduced opacity + no interaction)
  - Cards: default (subtle shadow), interactive (hover lifts slightly if clickable)
  - Content sections: loading (skeleton), loaded (fade in), error (gentle error state with retry)
  
- **Icon Selection**: 
  - CheckCircle for completed screening questions
  - X for close/exit actions
  - ArrowRight/ArrowLeft (flipped for RTL) for navigation
  - Info for informational tooltips
  - Heart for resource/support sections
  
- **Spacing**: 
  - Consistent 4-based scale: 4px, 8px, 16px, 24px, 32px, 48px
  - Card padding: 24px (mobile) / 32px (desktop)
  - Section gaps: 32px
  - Element gaps within sections: 16px
  
- **Mobile**: 
  - Single column layout on mobile (<768px)
  - Full-width cards with 16px horizontal margins
  - Touch-friendly button sizes (minimum 44px height)
  - Fixed header with proper RTL title alignment
  - Bottom-fixed action buttons for primary CTAs
  - Collapsible sections for long content
