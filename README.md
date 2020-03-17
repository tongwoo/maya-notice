# maya-notice
A simple, lightweight notification plugin

# install

```
npm install maya-notice --save
```

# usage

quick use

```
import notice from "maya-notice";
import "maya-notice/src/style.css";

notice.info("hello world");
notice.success("hello world");
notice.warning("hello world");
notice.error("hello world");
notice.loading("Loading...please wait");
```

Use more options

```
notice.open({
    type : 'error',
    content : 'hi how are you',
    duration : 5000,
    maskable : true,
    onClose : function(){
        alert('closed');
    }
});
```

```
notice.close();
```

execute callback function after closing

```
notice.loading("Loading...",{
    onClose:function(){
        alert('closed');
    }
});
```

# options

<table>
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>content</td>
            <td>String</td>
            <td>""</td>
            <td>Content string</td>
        </tr>
        <tr>
            <td>type</td>
            <td>String</td>
            <td>"info"</td>
            <td>Optional values are:info,success,error,warning,loading</td>
        </tr>
        <tr>
            <td>duration</td>
            <td>Number</td>
            <td>2500</td>
            <td>Display duration</td>
        </tr>
        <tr>
            <td>maskable</td>
            <td>Boolean</td>
            <td>false</td>
            <td>Whether to display the background mask layer</td>
        </tr>
        <tr>
            <td>onClose</td>
            <td>Function</td>
            <td>
            function(){}
            </td>
            <td>Callback function after closing</td>
        </tr>
    </tbody>
</table>