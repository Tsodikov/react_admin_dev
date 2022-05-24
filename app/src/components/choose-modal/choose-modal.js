import React from "react";
import UIkit from 'uikit';

const ChooseModal = ({modal, target, data, redirect}) => {
    const list = data.map(item => {
        if (item.time) {
            return (  
                <li key={item.file}>
                    <a className="uk-link-muted uk-modal-close"
                        href="#"
                        onClick={e => redirect(e, item.file)}>Резервна копія від: {item.time}
                    </a>
                </li>
            );
        } else {
            return (
                <li key={item}>
                    <a className="uk-link-muted uk-modal-close"
                        href="#"
                        onClick={e => redirect(e, item)}>{item}
                        
                    </a>
                </li>
            )
        }
        
    });

    let msg;
    if (data.length < 1) {
        msg = <div>Резервних копій нажаль не існує</div>
    }

    return (
        <div id={target} uk-modal={modal.toString()} container="false">
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Сторінки</h2>
                {msg}
                <ul className="uk-list uk-list-divider">
                    {list}
                </ul>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close uk-margin-small-right" type="button">Отменить</button>
                </p>
            </div>
        </div>
    )
}

export default ChooseModal;