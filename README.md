# React Multi Cursor

Add one or more custom cursors to your react app.

Check it [live here](https://react-multi-cursor.bonhomme.dev).

## Features

- Create a single cursor
- Add multiple cursors
- Position them as you wish
- Style each cursor individually
- Add smooth easing to cursors

## Installation

#### With npm `npm install react-multi-cursor`

#### With yarn `yarn add react-multi-cursor`

## Usage

To add your custom cursors create an array of objects and pass it through the `cursors` prop

```jsx
import ReactMultiCursor from "react-multi-cursor"

const cursors = [
  {
    angle: 0,
  },
  {
    angle: 180,
  },
  ...
]

const App = () => (
  <ReactMultiCursor cursors={cursors} />
)
```

## Available props

### `cursors` | array | required

Array of objects to display cursors.

- `angle` (required) Angle of rotation. `0` is on mouse position, `180` is the opposite of mouse position.
- `style` Style object to pass to each cursor element - to remove default styles pass an empty object
- `className` CSS class to pass to each cursor element - default: `'multi-cursor'`

```jsx
const cursors = [
  {
    angle: 0,
    style: { backgroundColor: 'red' }
    className: 'myCustomCursor'
  }
]

<ReactMultiCursor cursors={cursors} />
```

### `smoothness` | number | optional | default: 1

Smoothness of cursor position.

Default is 1 and it will not add any smooth to the cursor.

```jsx
<ReactMultiCursor cursors={cursors} smoothness={0.2} />
```

### `throttleDelay` | number | optional | default: 10

Mousemove event throttle delay

```jsx
<ReactMultiCursor cursors={cursors} throttleDelay={100} />
```

### `onUpdate` | function | optional

Function to call after each position update. The argument will give you each cursor position.

```jsx
<ReactMultiCursor
  cursors={cursors}
  onUpdate={c => {
    console.log(c)
  }}
/>
```
