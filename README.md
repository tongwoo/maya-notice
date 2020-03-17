# maya-notice
A simple, lightweight notification plugin

# install

```
npm install maya-notice --save
```

# usage

Pop up a general informative notification

```
import notice from "maya-notice"

notice.info("hello world");
```

# options

<table>
    <thead>
        <tr>
            <th>Properties</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>content</td>
            <td>String</td>
            <td></td>
        </tr>
        <tr>
            <td>type</td>
            <td>String</td>
            <td>info,success,error,warning,loading</td>
        </tr>
        <tr>
            <td>duration</td>
            <td>Number</td>
            <td></td>
        </tr>
        <tr>
            <td>maskable</td>
            <td>Boolean</td>
            <td></td>
        </tr>
        <tr>
            <td>onClose</td>
            <td>Function</td>
            <td></td>
        </tr>
    </tbody>
</table>