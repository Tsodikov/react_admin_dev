import '../../helpers/iframeLoader.js';
import axios from "axios";
import React, { Component } from "react";
import DOMHelper from '../../helpers/dom-helper.js';
import EditorText from '../editor-text';
import Spinner from '../spinner/';
import UIkit from 'uikit';
import ChooseModal from '../choose-modal';
import ConfirmModal from '../confirm-modal';
import EditorMeta from '../editor-meta';
import Panel from '../panel';


export default class Editor extends Component {
    constructor() {
        super();
        this.currentPage = "index.html";
        this.state = {
            pageList: [],
            backupsList: [],
            newPageName: '',
            loading: true
        }
        this.isLoaded = this.isLoaded.bind(this);
        this.isLoading = this.isLoading.bind(this);
        this.save = this.save.bind(this);
        this.init = this.init.bind(this);
        this.restoreBackup = this.restoreBackup.bind(this);
    }

    componentDidMount() {
        this.init(null, this.currentPage);
    }

    init(e, page) {
        if (e) {
            e.preventDefault();
        }
        this.isLoading();
        this.iframe = document.querySelector('iframe');
        this.open(page, this.isLoaded);
        this.loadPageList();
        this.loadBackupsList();
    }

    open(page, cbF) {
        this.currentPage = page;
        axios
            .get(`../${page}`)
            .then(res => DOMHelper.parseStrToDOM(res.data))
            .then(DOMHelper.wrapTextNodes)
            .then(dom => {
                this.virtualDom = dom;
                return dom;
            })
            .then(DOMHelper.serializeDOMToStr)
            .then(html => axios.post("./api/saveTempPage.php", {html}))
            .then(() => this.iframe.load("../kshcamf23n3i632.html"))
            .then(() => axios.post("./api/deleteTempPage.php"))
            .then(() => this.enableEditing())
            .then(() => this.injectStyles())
            .then(cbF);
        this.loadBackupsList();
    }

    async save(onSuccess, onError) {
        this.isLoading();
        const newDom = this.virtualDom.cloneNode(this.virtualDom);
        DOMHelper.unwrapTextNodes(newDom);
        const html = DOMHelper.serializeDOMToStr(newDom);
        await axios
            .post("./api/savePage.php", {pageName: this.currentPage, html})
            .then(onSuccess)
            .catch(onError)
            .finally(this.isLoaded);
        this.loadBackupsList();
    }

    enableEditing() {
        this.iframe.contentDocument.body.querySelectorAll("text-editor").forEach((element) => {
            const id = element.getAttribute("nodeid");
            const virtualElement = this.virtualDom.querySelector(`[nodeid="${id}"]`);
            virtualElement.innerHTML = element.innerHTML

            new EditorText(element, virtualElement);
        })
    }

    injectStyles() {
        const style = this.iframe.contentDocument.createElement("style");
        style.innerHTML = `
            text-editor:hover {
                outline: 3px solid orange;
                outline-offset: 8px;
            }
            text-editor:focus {
                outline: 3px solid red;
                outline-offset: 8px;
            }
        `;
        this.iframe.contentDocument.head.appendChild(style);
    }

    loadPageList() {
        axios
        .get('./api/pageList.php')
        .then(res => this.setState({pageList: res.data}))
        .catch(err => console.log(err))
    }

    loadBackupsList() {
        axios
        .get('./backups/backups.json')
        .then(res => this.setState({backupsList: res.data.filter(backup => {
            return backup.page === this.currentPage;
        })}))
    }

    restoreBackup(e, backup) {
        if (e) {
            e.preventDefault();
        }
        
        UIkit.modal.confirm("Ви насправді бажаєте відновити данні з цього бекапу? Всі наявні данні будуть змінени",
                            {labels: {ok: 'Відновити', cancel: 'Скасувати'}, })
                            .then(() => {
                                this.isLoading();
                                return axios
                                .post('./api/restoreBackup.php', {"page": this.currentPage, "file": backup})
                            })
                            .then(() => {
                                this.open(this.currentPage, this.isLoaded);
                            })
    }

    isLoading() {
        this.setState({loading: true});
    }

    isLoaded() {
        this.setState({loading: false});
    }

    render() {
        const {loading, pageList, backupsList} = this.state;
        const modal = true;
        let spinner;

        loading ? spinner = <Spinner active /> : spinner = <Spinner/>

        return (
            <>
                <iframe src="" frameBorder="0"></iframe>
                
                {spinner}

                <Panel />
                
                <ConfirmModal modal={modal} target={"modal-save"} method={this.save} />
                <ChooseModal modal={modal} target={"modal-open"} data={pageList} redirect={this.init} />
                <ChooseModal modal={modal} target={"modal-backup"} data={backupsList} redirect={this.restoreBackup} />
                
                {this.virtualDom ? <EditorMeta modal={modal} target={"modal-meta"} virtualDom={this.virtualDom}/> : false}
                {/* <EditorMeta modal={modal} target={"modal-meta"} virtualDom={this.virtualDom}/> */}
            </>
            
        )
    }
};