const App = () => {
    return (
        <div>
            <nav className="navbar">
                <ul className="nav-links">
                    <li><a href="#overview">Overview</a></li>
                    <li><a href="#challenge">The Challenge</a></li>
                    <li><a href="#solution">The Solution</a></li>
                    <li><a href="#architecture">Architecture</a></li>
                    <li><a href="#tech-stack">Technology</a></li>
                    <li><a href="#algorithm">Algorithm</a></li>
                </ul>
            </nav>
            <header className="header">
                <h1>ANHIVR: An Adaptive Neuro-Haptic Interface for VR</h1>
                <p>Resolving the trade-off between user immersion and task precision.</p>
            </header>
            <div className="container">
                <section id="overview" className="section">
                    <h2>📖 Overview</h2>
                    <p>ANHIVR is a novel, bio-adaptive system for Virtual Reality (VR) that aims to resolve the fundamental trade-off between user immersion and task precision. The system leverages the naturalness of bare-hand tracking for high immersion and dynamically mitigates its inherent imprecision by monitoring the user's cognitive state. Using a non-invasive EEG headset, ANHIVR objectively detects cognitive conflict by measuring the Feedback-Related Negativity (FRN) neural signal. When frustration or repeated errors are detected, the interface intelligently transitions to a high-precision, controller-assisted mode.</p>
                </section>

                <section id="challenge" className="section">
                    <h2>The Challenge: Immersion vs. Precision</h2>
                    <div className="grid">
                        <div className="card">
                            <h3>Immersion (Hand-Tracking)</h3>
                            <p>Highly natural and intuitive but often imprecise, leading to errors and user frustration.</p>
                        </div>
                        <div className="card">
                            <h3>Precision (Controllers)</h3>
                            <p>Reliable and accurate, providing haptic feedback, but can break the sense of presence by introducing a physical tool.</p>
                        </div>
                    </div>
                </section>

                <section id="solution" className="section">
                    <h2>💡 The Solution: ANHIVR</h2>
                    <p>ANHIVR is a closed-loop system that constantly monitors the user's cognitive state.</p>
                    <ul>
                        <li><strong>Default Mode:</strong> The user interacts naturally with hand-tracking for maximum immersion.</li>
                        <li><strong>Struggle Detected:</strong> The system's EEG sensors detect FRN signals, indicating user frustration.</li>
                        <li><strong>Adaptive Switch:</strong> The interface seamlessly transitions to a controller-assisted mode, providing the precision needed to overcome the challenge.</li>
                        <li><strong>Revert:</strong> Once the task is complete and frustration subsides, the system switches back to hand-tracking, restoring maximum immersion.</li>
                    </ul>
                </section>

                <section id="architecture" className="section">
                    <h2>⚙️ System Architecture</h2>
                    <img src="Architecture diagram.png" alt="ANHIVR Architecture" className="architecture-img" />
                </section>

                <section id="tech-stack" className="section">
                    <h2>💻 Technology Stack</h2>
                    <ul className="tech-stack">
                        <li>VR Headset: HTC Vive Pro 2</li>
                        <li>Hand Tracking: Leap Motion Controller 2</li>
                        <li>EEG Headset: Emotiv EPOC+</li>
                        <li>Haptic Controllers: Standard HTC Vive Controllers</li>
                        <li>Game Engine: Unity 2023</li>
                        <li>Programming Language: C#</li>
                        <li>SDKs: Unity VR SDK, Leap Motion Unity SDK, Emotiv Cortex SDK</li>
                    </ul>
                </section>

                <section id="algorithm" className="section">
                    <h2>🤖 Core Algorithm</h2>
                    <pre className="algorithm-code">
                        <code>
{`// System State Variables
public enum InteractionMode { HandTracking, ControllerAssisted };
private InteractionMode currentMode = InteractionMode.HandTracking;

// Algorithm Parameters
private float cognitiveConflictScore = 0.0f;
private const float THRESHOLD_HIGH = 0.75f; // Threshold to switch to controller
private const float THRESHOLD_LOW = 0.25f;  // Threshold to revert to hands
private const float alpha = 0.9f;         // Smoothing factor for new events
private const float decayRate = 0.995f;     // Rate at which score decays over time

// In the main game loop (executed every frame)
void Update() {
    // 1. Acquire Synchronized Data from all sensors
    EEG_Data eeg = EEG_SDK.GetData();
    User_Action action = GetLastUserAction(); // e.g., Grab, Release, Place

    // 2. Process EEG to Detect FRN Events
    if (IsEventFollowedByFRN(action, eeg)) {
        // A negative outcome was likely detected by the user
        float frnAmplitude = GetFrnAmplitude(eeg);

        // 3. Update Conflict Score using an exponential moving average
        cognitiveConflictScore = (alpha * cognitiveConflictScore) + ((1 - alpha) * frnAmplitude);
    } else {
        // If no conflict, slowly decay the score back towards zero
        cognitiveConflictScore *= decayRate;
    }

    // 4. Apply Mode Switching Logic with Hysteresis
    if (currentMode == InteractionMode.HandTracking && cognitiveConflictScore > THRESHOLD_HIGH) {
        SwitchModeTo(InteractionMode.ControllerAssisted);
    } else if (currentMode == InteractionMode.ControllerAssisted && cognitiveConflictScore < THRESHOLD_LOW) {
        SwitchModeTo(InteractionMode.HandTracking);
    }
}`}
                        </code>
                    </pre>
                </section>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
