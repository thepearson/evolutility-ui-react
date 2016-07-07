import React from 'react'

import format from '../../utils/format'
import NavLink from '../../Widgets/NavLink'

export default React.createClass({

  propTypes: {
    fields: React.PropTypes.array,
    //data: React.PropTypes.string,
    entity: React.PropTypes.string
  },

  render() {
  	var d=this.props.data || {}
    var fs = this.props.fields || []
    var e=this.props.entity
    var ep='/'+e+'/'

  	return (
      <div className="evol-cards-body">
          <div className="panel panel-info"> 
            {fs.map(function(f, idx){
              var attr=(f.type==='lov' && f.lovtable) ? f.id+'_txt' : f.id
              var fv=format.fieldValue(f, d[attr])
              return (
                <div key={idx}>
                  {idx===0 ? <h4><NavLink key={f.id} to={ep+"browse/"+d.id}>{fv}</NavLink></h4>
                    : <label>{f.label}: </label>}{' '}
                  {idx===0 ? null : fv}
                </div>
              )
            })}
          </div>
      </div>
  	)
  }

})