# XO
XO is a skeleton framework currently beign built to simplify web site layout. 

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
- gutter-toggle : toggles the view of a gutter object on the page
- label : create's a basic label view
- breadcrumb : creates a breadcrumb navigation layout
- panel : creates a panel layout
- mobile-item : this item will only be shown to mobile navigators
- video : creates a video object with specific parameters
  - requires five parameters : xo-video-src (required : url), xo-video-format (required : string), xo-video-controls (required : boolean), xo-video-autoplay (required : boolean), xo-video-width (required : numeric), xo-video-height (required : numeric)
- data : pulls data from a json datasource specified in the html attribute tag (documentation in preperation)
- modal : creates a modal pop up with content template injected from the xo-template tag  (documentation in preperation)
- form : creates a form from a json file (documentation in preperation)

#### xo-type-param : defines parameters of a specific xo-object type. This can be :

- left
- right

#### xo-state : defines the visual state of an xo-object. This can be :

- open (applies to gutters, panels or accordions)
- closed (applies to gutters, panels or accordions)
- hidden (hides the element)

#### xo-trigger : defines an object that triggers an event or function. This can be :

- tooltip
  - requires one parameter : xo-tooltip-text
- url
  - requires one parameter : xo-trigger-url
- modal
- pop-up
- script
- data
- ajax
  - requires one parameter : xo-ajax-url

#### xo-span : defines the span of the element inside the parent tag. This can be

- full
- half
- pct(num%)
- pix(numPX)
- auto

## Documentation

### getData
The getData function allows json data to be queried with a jQuery ajax instruction. The function itself can be used independantly but it will not parse the returned json and will instead paste the block of data as text inside a page object.

#### Structure

The function has 6 parameters of which only 2 are required. When using getData with other functions (see below) some other parameters become required.

``function (scriptPath, scriptURI, method, identifier, target, flush)``

Parameters
- scriptPath (optional) : the script path is the hierarchical path to where the script returning json resides. Depending on your needs, this can usually be defined in the config under ```ajaxPathDefault```. scriptPath overrides the default configuration in order to give the script more flexibility. Set to null in order to use the default value.
- scriptURI (required) : the script uri is the file that returns the json object. This can be a script or a json file. You can also use a folder structure in this parameter (i.e. ```folder/folder/file.json```) in order to allow subfolder access.
- method : the method parameter defines what the script will do with the returned data once the success function fires. The accepted methods are :
-       'p' : parse
-       'b' : brut
-       's' : save to session
- identifier (optional) : this allows you to associate the data returned with an identifier. This is handy when saving the returned data to session or local storage or binding it to a specific xo component on the page. This pararmeter is optional but should be defined if the data is to be retreated later.
- target (optional) : this parameter defines an xo object as the host for the returned data. This parameter is only required when passing the returned json to the parseData method.
- flush (optional) : this parameter is used when saving and loading data to and from a session or local storage object. It defines whether the storage object is to be flushed once the data is recovered. See the ```getDataFromSession()``` function documentation to learn more about this.
