
// Evolutility-UI-React :: toolbar.js

// Toolbar w/ icons for CRUD, export, and charts.

// https://github.com/evoluteur/evolutility-ui-react
// (c) 2017 Olivier Giulieri

import React from 'react'
import axios from 'axios'
import { browserHistory, Link } from 'react-router'
import Modal from 'react-modal'

import evoGlobals from '../../utils/evoGlobals'
import {apiPath} from '../../../config.js'
import {i18n_actions, i18n_msg} from '../../i18n/i18n'
import models from '../../../models/all_models'

const menuItems = { 
    new: {id: 'edit/0', label: i18n_actions.new, icon:'plus', n:'x', readonly:false},
    del: {id: 'del', label: i18n_actions.delete1, icon:'trash', n:'1', readonly:false},
    //filter: {id:'filter', label: i18n_actions.filter, icon:'filter', n:'n'},
    export: {id: 'export', label: i18n_actions.export1, icon:'cloud-download', n:'x'},
    save: {id:'save', label: i18n_actions.save, icon:'floppy-disk', n:'1', readonly:false},
    //import: {id:'import', label: i18n_actions.bImport, icon:'cloud-upload',n:'x'},
    //cog: {id:'cog',label: 'Customize', icon:'cog', n:'x'},
    //print: {id: 'print', label: '', icon:'print', n:'x'},
    //prev: {id:'prev', label: '', icon:'chevron-left', n:'x'},
    //next: {id:'next', label: '', icon:'chevron-right', n:'x'}
    //sel: {id: 'selections', label: i18n_actions.Selections, icon:'star', n:'x'},
    views: {
        browse: {id:'browse', label: i18n_actions.browse, icon:'eye-open', n:'1'},// // ReadOnly
        edit: {id:'edit', label: i18n_actions.edit, icon:'edit', n:'1', readonly:false},// // All Fields for editing

        list: {id:'list', label: i18n_actions.list, icon:'th-list', n:'n'},
        cards: {id:'cards', label: i18n_actions.cards, icon:'th-large', n:'n'},
        //scatter: {id:'scatter', label: i18n_actions.bScatter, icon:'certificate',n:'n'},
        charts: {id:'charts', label: i18n_actions.charts, icon:'stats', n:'n'}
    },
    //search: true
}

function isFunction(fn) {
    var getType = {};
    return fn && getType.toString.call(fn) === '[object Function]';
}

export default React.createClass({

  propTypes: {
    params: React.PropTypes.shape({
      entity: React.PropTypes.string.isRequired,
      id: React.PropTypes.string
    }),
  },

  getInitialState() {
    return {
      deleteConfirmation: false
    }
  },

  confirmDelete(){
    this.setState({
      deleteConfirmation: true
    })
  },

  closeModal(){
    this.setState({
      deleteConfirmation: false
    })
  },

  deleteOne(){
    // TODO: SHOULD BE IN STORE BUT THERE IS NO STORE YET
    const {entity, id} = this.props.params
    if(entity && id && models[entity]){
      axios.delete(apiPath+entity+'/'+id)
        .then(response => {
          //alert('Item deleted.')
          console.log('Item deleted.')
          evoGlobals.skip_confirm = true
          browserHistory.push('/'+entity+'/list')
        })
        .catch(() => {
          this.setState({
            error: {
              message: 'Couldn\'t delete record.'
            }
          })
        });
    }
    this.closeModal()
  },

  exportMany(){
    // - export all records as a CSV file.
    const e = this.props.entity || ''
    window.open(apiPath+e+'?format=csv', '_blank');
  },

  render() {
    const {entity, id} = this.props.params,  ep='/' + entity + '/',
        cStyle={
          color: '#FFCC80',
        },
        urlSearch = window.location.search ? window.location.search.substring(1) : '';

    let idx = 0, view = this.props.view

    function iicon(icon){
      return <i className={'glyphicon glyphicon-'+icon}></i>
    }

    function buttonLink(menu, idOrFun, iconOnly, style){
      const text = iconOnly ? null : menu.label
      if (isFunction(idOrFun)) {
        return <li key={idx++}><a href="javascript:void(0)" onClick={idOrFun} style={style}>{iicon(menu.icon)} {text}</a></li>
      }
      else {
        return <li key={idx++}><Link to={ep+menu.id+'/'+idOrFun} activeStyle={cStyle} style={style}>{iicon(menu.icon)} {text}</Link></li>
      }
    }

    const views = menuItems.views;
    const viewsList = ['list', 'cards', 'charts'].map(function(menu){
                        return buttonLink(views[menu], '', true)
                    });

    let actions = [];

    if (id) {
      const isNew = this.props.isNew || id == 0;
      if (!isNew) {
        if (view === 'edit') {
          actions.push(buttonLink(menuItems.views.browse, id));
        }
        else if (view === 'browse') {
          actions.push(buttonLink(menuItems.views.edit, id, null, {minWidth: '88px'}));
        }
        actions.push(buttonLink(menuItems.del, this.confirmDelete));
      }
    }
    else if (view != 'charts') {
      //actions.push(buttonLink(menuItems.views.charts, ''));
      actions.push(buttonLink(menuItems.export, this.exportMany));
    }

    if (entity && models[entity]) {
      const delModal = this.state.deleteConfirmation ? (
        <Modal className="modal-dialog"
          isOpen={this.state.deleteConfirmation}
          onRequestClose={this.closeModal}
          style={{content:{position:'absolute',top:'calc(50% - 200px)',left:'calc(50% - 150px)',height:'200px',width:'300px'}}}>
          <div>
            <div className="modal-content">
              <div className="modal-header">
                <button  onClick={this.closeModal} className="close" data-dismiss="modal" aria-hidden="true">×</button>
                <h4 className="modal-title">Delete item</h4>
              </div>
              <div className="modal-body">
                Do you really want to delete the {models[entity].name}?
              </div>
              <div className="modal-footer">
                <button key="bDelCancel" onClick={this.closeModal} className="btn btn-default" data-dismiss="modal">{i18n_actions.cancel}</button>
                <button key="bDelOK" onClick={this.deleteOne} className="btn btn-info" data-dismiss="modal">{i18n_actions.ok}</button>
              </div>
            </div>
          </div>
        </Modal>
        ) : null;

      return (
        <div className="evo-toolbar">
          <ul role="nav" className="evo-nav-pills pull-left">
            {viewsList}
          </ul>
          <ul role="nav" className="evo-nav-pills pull-left">
            {buttonLink(menuItems.new, '')}
          </ul>
          <ul role="nav" className="evo-nav-pills pull-left"
            style={{minWidth:'220px'}}>
                {actions}
                <li/>
          </ul>

          <div className="clearfix"/>

          {delModal}

        </div>
      )
    }
    return null
  }

})
