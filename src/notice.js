/**
 * A simple, lightweight notification plugin
 * @author tongwoo <i@wutong.me>
 * @copyright 2020
 */
import "core-js/es/object/assign";

let defaults = {
    type: "info", //info,warning,error,success,loading
    content: "",
    duration: 2500,
    maskable: false,
    onClose: function () {
    }
};

let iconInfo = `
<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
    <path d="M507.936 0C227.556 0 0 227.555 0 507.936s227.556 507.937 507.936 507.937 507.937-227.556 507.937-507.937S788.317 0 507.936 0zM558.73 761.905 457.143 761.905 457.143 457.143 558.73 457.143 558.73 761.905zM558.73 355.555 457.143 355.555 457.143 253.968 558.73 253.968 558.73 355.555z" fill="#1296db"></path>
</svg>
`;

let iconSuccess = `
<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path d="M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z m306.901333 354.133333l-342.357333 361.6a33.450667 33.450667 0 0 1-28.288 15.701334 33.450667 33.450667 0 0 1-24.32-10.581334L253.866667 542.378667a37.333333 37.333333 0 0 1 0-50.986667 33.450667 33.450667 0 0 1 24.32-10.581333c9.130667 0 17.877333 3.84 24.277333 10.581333l145.237333 152.405333 322.56-340.650666a33.450667 33.450667 0 0 1 24.32-10.581334c9.173333 0 17.92 3.84 24.32 10.581334a37.376 37.376 0 0 1 0 50.986666z" fill="#4CAF50" p-id="6253" data-spm-anchor-id="a313x.7781069.0.i9" class="selected"></path>
</svg>`;

let iconLoading = `
<svg width="24" height="24" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#078c8b">
    <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".2" cx="18" cy="18" r="18"/>
            <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>
            </path>
        </g>
    </g>
</svg>`;

let iconError = `
<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
    <path d="M512 0A512 512 0 1 0 1024 512 512 512 0 0 0 512 0z m209.204301 669.673978a36.555699 36.555699 0 0 1-51.750538 51.640431L511.779785 563.64043 353.995699 719.662796a36.555699 36.555699 0 1 1-52.301075-51.089893 3.303226 3.303226 0 0 1 0.88086-0.88086L460.249462 511.779785l-157.013333-157.453763a36.665806 36.665806 0 1 1 48.777634-55.053764 37.876989 37.876989 0 0 1 2.972904 2.972903l157.233548 158.114409 157.784086-156.132473a36.555699 36.555699 0 0 1 51.420215 52.08086L563.750538 512.220215l157.013333 157.453763z" fill="#FF5252" data-spm-anchor-id="a313x.7781069.0.i15"></path>
</svg>`;

let iconWarning = `
<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24">
    <path d="M512 1023.926857a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z m0-153.6a76.8 76.8 0 1 0 0-153.6 76.8 76.8 0 0 0 0 153.6zM588.8 204.8c-4.827429-31.232-51.2-25.673143-51.2-25.673143h-51.2c-47.177143-1.609143-51.2 25.673143-51.2 25.673143l25.6 409.526857c3.803429 33.792 51.2 25.6 51.2 25.6h25.6c16.822857 2.413714 25.6-25.6 25.6-25.6s29.110857-386.633143 25.6-409.526857z" fill="#f4ea2a"></path>
</svg>`;

let container = null;

let closeTimer = null;

let removeTimer = null;

let configure = {};

function open(config) {
    if (closeTimer) {
        window.clearTimeout(closeTimer);
    }
    if (removeTimer) {
        window.clearTimeout(removeTimer);
    }
    let _defaults = Object.assign({}, defaults);
    configure = Object.assign(_defaults, config);
    if (container == null) {
        container = document.createElement("div");
        container.setAttribute("class", "maya-notice-container");
    } else {
        container.classList.remove("maya-notice-hide");
    }
    document.documentElement.appendChild(container);
    let icon;
    switch (configure.type) {
        case "info":
            icon = iconInfo;
            break;
        case "success":
            icon = iconSuccess;
            break;
        case "loading":
            icon = iconLoading;
            break;
        case "error":
            icon = iconError;
            break;
        case "warning":
            icon = iconWarning;
            break;
        default:
            icon = iconInfo;
            break;
    }
    let template = `
        <div class="maya-notice-box">
            <div class="maya-notice-icon">
                ${icon}
            </div>
            <div class="maya-notice-content">${configure.content}</div>
        </div>
        
    `;
    if (configure.maskable) {
        template += `<div class="maya-notice-overlay"></div>`;
    }
    container.innerHTML = template;
    if (configure.duration > 0) {
        closeTimer = window.setTimeout(close, configure.duration);
    }
}

function close(closure) {
    if (container != null) {
        container.classList.add("maya-notice-hide");
        removeTimer = window.setTimeout(() => {
            if (container.parentNode !== null) {
                container.parentNode.removeChild(container);
            }
            if (closure) {
                closure();
            } else {
                configure.onClose();
            }
        }, 300);
    }
}

function info(content, configure) {
    open(
        Object.assign(
            {
                type: "info",
                content
            },
            configure
        )
    );
}

function error(content, configure) {
    open(
        Object.assign(
            {
                type: "error",
                content
            },
            configure
        )
    );
}

function warning(content, configure) {
    open(
        Object.assign(
            {
                type: "warning",
                content
            },
            configure
        )
    );
}

function success(content, configure) {
    open(
        Object.assign(
            {
                type: "success",
                content
            },
            configure
        )
    );
}

function loading(content, configure) {
    open(
        Object.assign(
            {
                type: "loading",
                content,
                duration: 0,
                maskable: true
            },
            configure
        )
    );
}

module.exports = {
    defaults,
    open,
    info,
    error,
    warning,
    success,
    close,
    loading
};
