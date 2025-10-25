Toggles
A toggle lets people choose between a pair of opposing states, like on and off, using a different appearance to indicate each state.
A stylized representation of two labeled switch controls. The image is tinted red to subtly reflect the red in the original six-color Apple logo.

A toggle can have various styles, such as switch and checkbox, and different platforms can use these styles in different ways. For guidance, see Platform considerations.

In addition to toggles, all platforms also support buttons that behave like toggles by using a different appearance for each state. For developer guidance, see ToggleStyle.

Best practices
Use a toggle to help people choose between two opposing values that affect the state of content or a view. A toggle always lets people manage the state of something, so if you need to support other types of actions — such as choosing from a list of items — use a different component, like a pop-up button.

Clearly identify the setting, view, or content the toggle affects. In general, the surrounding context provides enough information for people to understand what they’re turning on or off. In some cases, often in macOS apps, you can also supply a label to describe the state the toggle controls. If you use a button that behaves like a toggle, you generally use an interface icon that communicates its purpose, and you update its appearance — typically by changing the background — based on the current state.

Make sure the visual differences in a toggle’s state are obvious. For example, you might add or remove a color fill, show or hide the background shape, or change the inner details you display — like a checkmark or dot — to show that a toggle is on or off. Avoid relying solely on different colors to communicate state, because not everyone can perceive the differences.

Platform considerations
No additional considerations for tvOS, visionOS, or watchOS.

iOS, iPadOS
Use the switch toggle style only in a list row. You don’t need to supply a label in this situation because the content in the row provides the context for the state the switch controls.

Change the default color of a switch only if necessary. The default green color tends to work well in most cases, but you might want to use your app’s accent color instead. Be sure to use a color that provides enough contrast with the uncolored appearance to be perceptible.

An illustration of two list rows, one with an active switch toggle and one with an inactive switch toggle. The active toggle is tinted green with the standard switch color.
Standard switch color

An illustration of two list rows, one with an active switch toggle and one with an inactive switch toggle. The active toggle is tinted purple with a custom switch color.
Custom switch color

Outside of a list, use a button that behaves like a toggle, not a switch. For example, the Phone app uses a toggle on the filter button to let users filter their recent calls. The app adds a blue highlight to indicate when the toggle is active, and removes it when the toggle is inactive.

A screenshot of the top half of the Phone app on iPhone, showing the filtered list of recent missed calls. The filter button in the top trailing corner has a blue highlight, indicating that the toggle is active.
The Phone app uses a toggle to switch between all recent calls and various filter options. When someone chooses a filter, the toggle appears with a custom background drawn behind the symbol.

A screenshot of the top half of the Phone app on iPhone, showing all recent calls. The filter button in the top trailing corner has no highlight, indicating that the toggle is inactive.
When someone returns to the main Recents view, the toggle appears without anything behind the symbol.

Avoid supplying a label that explains the button’s purpose. The interface icon you create — combined with the alternative background appearances you supply — help people understand what the button does. For developer guidance, see changesSelectionAsPrimaryAction.