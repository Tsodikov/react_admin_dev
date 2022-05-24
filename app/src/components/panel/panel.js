import React from "react";
import UIkit from 'uikit';

const Panel = () => {
    return (
        <div className="panel">
            <button className="uk-button uk-button-primary uk-margin-small-right" uk-toggle="target: #modal-open">Сторінки</button>
            <button className="uk-button uk-button-primary uk-margin-small-right" uk-toggle="target: #modal-save">Опрілюднити</button>
            <button className="uk-button uk-button-primary uk-margin-small-right" uk-toggle="target: #modal-meta">Редагувати META</button>
            <button className="uk-button uk-button-default" uk-toggle="target: #modal-backup">Відновити</button>
        </div>
    )
}

export default Panel;