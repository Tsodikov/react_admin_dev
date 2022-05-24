import React from "react";
import UIkit from 'uikit';

const ConfirmModal = ({modal, target, method}) => {
    return (
        <div id={target} uk-modal={modal.toString()} container="false">
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Сохранение</h2>
                <p>Изменения, которые вы сделали, сразу будут опубликованы на вашем сайте. Вы действительно хотите их опубликовать?</p>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close uk-margin-small-right" type="button">Отменить</button>
                    <button className="uk-button uk-button-primary uk-modal-close"
                            type="button"
                            onClick={() => method(() => {
                                UIkit.notification({message: 'Изменения опубликованы на вашем сайте', status: "success"})},
                                () => {
                                UIkit.notification({message: 'Что-то пошло не так, изменения не внесены', status: "danger"})}
                            )}>Опубликовать</button>
                </p>
            </div>
        </div>
    )
}

export default ConfirmModal;