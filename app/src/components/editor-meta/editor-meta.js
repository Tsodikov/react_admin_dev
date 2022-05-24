import React, { Component } from "react";
// import UIkit from 'uikit';

export default class EditorMeta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meta: {
                title: "",
                keywords: "",
                description: ""
            }
            
        }

    }

    componentDidMount() {
        if (this.props.virtualDom) {
        this.getMeta(this.props.virtualDom)}
    }

    getMeta(virtualDom) {
        let title = virtualDom.head.querySelector('title') || virtualDom.head.appendChild(virtualDom.createElement('title'));

        let keywords = virtualDom.head.querySelector('meta[name="keywords"]');
        if (!keywords) {
            keywords = virtualDom.head.appendChild(virtualDom.createElement('meta'));
            keywords.setAttribute("name", "keywords");
        }

        let description = virtualDom.head.querySelector('meta[name="description"]');
        if (!description) {
            description = virtualDom.head.appendChild(virtualDom.createElement('meta'));
            description.setAttribute("name", "description");
        }

        this.setState({
            meta: {
                title: title.innerHTML,
                keywords: keywords.getAttribute("content"),
               description:description.getAttribute("content"),
            }
        })
    }

    render() {
        const {modal, target, virtualDom} = this.props;
        const {title, keywords, description} = this.state.meta;

        return (
            <div id={target} uk-modal={modal.toString()} container="false">
                <div className="uk-modal-dialog uk-modal-body">
                    <h2 className="uk-modal-title">Редагування Мета-тегов</h2>

                    <form>
                        <div className="uk-margin">
                            <input className="uk-input" type="text" placeholder="Title" value={title}/>
                        </div>
                        <div className="uk-margin">
                            <textarea className="uk-textarea" rows="5" placeholder="Keywords" value={keywords}></textarea>
                        </div>
                        <div className="uk-margin">
                            <textarea className="uk-textarea" rows="5" placeholder="Description" value={description}></textarea>
                        </div>
                    </form>

                    <p className="uk-text-right">
                        <button className="uk-button uk-button-default uk-modal-close uk-margin-small-right" type="button">Отменить</button>
                        <button className="uk-button uk-button-primary uk-modal-close" type="button">Застосувати</button>
                    </p>
                </div>
            </div>
        )
    }
}