# XO
XO is a skeleton framework currently being built to simplify web site layout.

The goal of this framework is to render the task of creating and managing layout objects and templates as easy as possible using readable data attributes, reusable json sources and lightweight code.

The framework will also simplify the creation of mobile specific objects such as gutters, panel layout, icon navigation, buttons, gestures and common breakpoints. 

Another goal of the xo project is to make it easier to manipulate the dom by targeting object attributes recursively and allowing the user to define what functions should be initialized or not. .

Any collaboration on this project would be greatly appreciated.

NOTE : In the examples section, XO is integrated using require.js. Require.js is not necessary for XO to run.

## HTML DATA ATTRIBUTES

The core features of XO reside in html tag data-attributes. HTML items are bound to javascript functions and events by adding specific data-attributes, type and values. The data attributes also bind the object to css styles, other components or secondary actions.

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
- data : pulls data from a json datasource specified in the html attribute tag (see getData function documentation)
- modal : creates a modal pop up with content template injected from the xo-template tag  (documentation in preperation)
- form : creates a form from a json file (documentation in preperation)
- dropdown : creates a dropdown from the ul found within the tag
- jsondropdown : creates a data driven dropdown from a json source
- navigation : creates a horizontal navigation pane that can contain images, buttons, icons, forms or dropdowns. The navigation object is data driven json source
- warning : creates a contextual alert message within an xo object or page
- poster : creates a posterized image and text layout
- tabs : creates a tab panel layout

##### xo-type-param : defines parameters of a specific xo-object type. This can be :

- left
- right

##### xo-state : defines the visual state of an xo-object. This can be :

- open (applies to gutters, panels or accordions)
- closed (applies to gutters, panels or accordions)
- hidden (hides the element)

##### xo-trigger : defines an object that triggers an event or function. This can be :

- tooltip
  - requires one parameter : xo-tooltip-text
- url
  - requires one parameter : xo-trigger-url
- modal
- popup
- script
- data
- ajax
  - requires one parameter : xo-ajax-url

##### xo-template : defines a JSON formatted template tag that can modify display features of specific xo objects

(documentation in preparation)

##### xo-span : defines the span of the element inside the parent tag. This can be

- full
- half
- pct(num%)
- pix(numPX)
- auto
- sticky : creates a sticky bar who's view persists on the page

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
    - 'p' : parse
    - 'b' : brut
    - 's' : save to session
- identifier (optional) : this allows you to associate the data returned with an identifier. This is handy when saving the returned data to session or local storage or binding it to a specific xo component on the page. This pararmeter is optional but should be defined if the data is to be retreated later.
- target (optional) : this parameter defines an xo object as the host for the returned data. This parameter is only required when passing the returned json to the parseData method.
- flush (optional) : this parameter is used when saving and loading data to and from a session or local storage object. It defines whether the storage object is to be flushed once the data is recovered. See the ```getDataFromSession()``` function documentation to learn more about this.

### saveDataToSession
The saveDataToSession function allows other functions to pass and save data to session storage that can be queried by other functions using a unique id or key + id combination.

#### Structure

The function has 4 parameters, of which only 2 are required.

``function (data, method, key, id)``

Parameters
- data (required) : this defines the data that is passed to the function (in Json format). If we stay within the scope of the XO Framework, the data will be passed via the getData function and, if the method selected is save, will be saved to session. The data that is used can be converted to string or parsed prior to being saved as the session object will only save text and not the json object itself.
- method (required) : the method parameter defines how the data is to be treated. Currently XO only supports sessionStorage with a localStorage fallback. The available methods are :
    - 's' : sessionStorage
- key (optional) : the key parameter allows you to define a specific key or prefix to your localStorage object. If for example you are working on a project name FOO, you can define your key to be FOO-. All your stored data will be formated as FOO-xxxx. The key can be defined as an XO config or set each time the function is called. If key is set to null or left empty, the sessionStorageKey config item will be used.
- id (optional) : the id parameter allows you to append a unique value to identify stored data. Some of XO's functions define the key and id combination automatically based on an objects data attributes but if you use this function alone or are extending the framework, you can pass unique values.

Note : If the users navigator doesn't support storage, a log message will be fired.

### getDataFromSession
The getDataFromSession function allows other functions to recover and use data that has been saved to a session object in json format. This allows you to create persistent data objects that only need to be queried once. The data that is returned by the function can then be manipulated or queried as you wish.

#### Structure

The function has 4 parameters, of which only 2 are required.

``function (key, id, parse, flush)``

Parameters
- key (required) : the key parameter allows you to define the specific key that you are using as a prefix for your session data objects. Most of XO's functions will use the sessionStorageKey config item when collecting data.
- id (required) : the id parameter is the unique value that is appended to the key to create a data identifier. You can then query a specific storage object by calling it by name. Most of XO's functions will use the html items xo-object-name to map a data source to a dom object.
- parse (optional:boolean) : the parse parameter allows you to define whether or not you want the returned data to be parsed as JSON and, therefore, converted to an object.
- flush (optional:boolean) : the flush parameter allows you to define whether you want the session storage item to be removed once the data has been collected. This can be useful if space is an issue and where persistence is not necessary.

Note : If the users navigator doesn't support storage this function will return null.