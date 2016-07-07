# EXO
EXO is a skeleton framework currently beign built to simplify web site layout. 

The goal of this framework is to render the task of converting layouts that use absolute sizing methods to relative sized grid layout (px to %) by wrapping pages in a global wrapper, overwriting only specific style attributes and applying inherited styles to all child objects.

The framework will also simplify the creation of mobile specific objects such as gutters, panel layout, icon navigation, buttons, gestures and common breakpoints. 

The javascript component of the exo project will make it easier to manipulate the dom by targeting object attributes recursively.

Any collaboration on this project would be greatly appreciated.

## HTML DATA ATTRIBUTES

The core features of XO reside in html tag data-attributes. HTML items can be bound to css styles or components as well as bound to javascript functions and events by adding specific data-attributes and values.

```<div xo-type="objectType" xo-type-value="aValue" xo-trigger"triggersSomething">Foo</div> ```

XO data tags all start with xo-. What follows will be either an action, the value of the action or a parameter. Below is a list of currently implemented data-attributes

##### xo-type : defines the html object's type. This can be :

- gutter : creates a gutter panel that can be animated
- gutter-toggle : toggles into view a gutter object on the page
- label : create's a basic label view
- breadcrumb : creates a breadcrumb navigation layout
- panel : creates a panel layout
- mobile-item : this item will only be shown to mobile navigators

#### xo-type-param : defines parameters of a specific xo-object type. This can be :

- left
- right

#### xo-state : defines the visual state of an xo-object. This can be :

- open (applies to gutters, panels or accordions)
- closed (applies to gutters, panels or accordions)
- hidden (hides the element)

#### xo-trigger : defines an object that triggers an event or function. This can be :

- tooltip
- url
- modal
- pop-up
- script
- data
- ajax