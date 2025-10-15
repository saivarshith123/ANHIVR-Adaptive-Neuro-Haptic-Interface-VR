# ANHIVR: An Adaptive Neuro-Haptic Interface for Virtual Reality

## 📖 Overview

ANHIVR is a novel, bio-adaptive system for Virtual Reality (VR) that aims to resolve the fundamental trade-off between user immersion and task precision. The system leverages the naturalness of bare-hand tracking for high immersion and dynamically mitigates its inherent imprecision by monitoring the user's cognitive state. Using a non-invasive EEG headset, ANHIVR objectively detects cognitive conflict by measuring the Feedback-Related Negativity (FRN) neural signal. When frustration or repeated errors are detected, the interface intelligently transitions to a high-precision, controller-assisted mode.

## The Challenge: Immersion vs. Precision

* **Immersion (Hand-Tracking):** Highly natural and intuitive but often imprecise, leading to errors and user frustration.
* **Precision (Controllers):** Reliable and accurate, providing haptic feedback, but can break the sense of presence by introducing a physical tool.

## 🧠 Key Insight: A Window into the User's Mind

Recent advancements in Brain-Computer Interfaces (BCI) show that cognitive conflict—the brain's response to an unexpected or negative outcome—can be measured objectively using EEG. The **Feedback-Related Negativity (FRN)** is a neural signal that reliably appears approximately 250ms after a user recognizes an error, acting as a biological marker for frustration.

## 💡 The Solution: ANHIVR

ANHIVR is a closed-loop system that constantly monitors the user's cognitive state.
* **Default Mode:** The user interacts naturally with hand-tracking for maximum immersion.
* **Struggle Detected:** The system's EEG sensors detect FRN signals, indicating user frustration.
* **Adaptive Switch:** The interface seamlessly transitions to a controller-assisted mode, providing the precision needed to overcome the challenge.
* **Revert:** Once the task is complete and frustration subsides, the system switches back to hand-tracking, restoring maximum immersion.

## ⚙️ System Architecture

The ANHIVR system is designed with a modular, closed-loop architecture to handle the flow of data from input sensors, through the processing core, and to the VR application.

![ANHIVR Architecture Diagram](Architecture%20diagram.png)

### System Components:

**1. Input Layer**
* **Hand Tracking Sensor:** Captures hand and finger movements for gesture-based interaction.
* **EEG Headset:** Captures brainwave data to isolate the FRN signal.
* **VR Controllers:** Used for high-precision tasks and providing haptic feedback.

**2. Processing Core (ANHIVR Engine)**
* **Data Acquisition Module:** Collects and synchronizes data streams from all sensors.
* **EEG Processing Module:** Filters raw EEG data to detect FRN events in real-time.
* **Cognitive State Classifier:** Analyzes the frequency and amplitude of FRN events to detect a state of cognitive conflict.
* **Adaptive Control Logic:** The core decision-making algorithm that determines when to switch interaction modes.
* **Interaction Mode Switcher:** Executes the change in the VR application's control scheme.

**3. Output Layer (VR Application)**
* **Visual Feedback:** Provides visual cues when the interaction mode changes.
* **Haptic Feedback:** Physical controllers provide tactile feedback to confirm successful interactions.
* **Adaptive UI:** The user interface itself adapts to the user's cognitive state.

## 💻 Technology Stack

* **VR Headset:** HTC Vive Pro 2
* **Hand Tracking:** Leap Motion Controller 2
* **EEG Headset:** Emotiv EPOC+
* **Haptic Controllers:** Standard HTC Vive Controllers
* **Game Engine:** Unity 2023
* **Programming Language:** C#
* **SDKs:** Unity VR SDK, Leap Motion Unity SDK, Emotiv Cortex SDK

## 🤖 Core Algorithm

The **Adaptive Control Logic Algorithm** runs continuously, maintaining a `cognitiveConflictScore` that quantifies the user's level of struggle. It functions as a state machine to transition between `HandTracking` and `ControllerAssisted` modes.

```csharp
// System State Variables
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
}
```
