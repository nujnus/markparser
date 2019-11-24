import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, withRouter,Switch, Route, Link } from "react-router-dom";

import { WithRouterConnectedMyLayout } from  "../component/layout/mylayout.js"
import {ConnectedMyError }  from '../component/content/error.js'
import {ConnectedMyRestConfig} from  '../component/content/rest_config.js'
import {ConnectedMyCard} from  '../component/content/card.js'
import {ConnectedMyCardsEdit} from  '../component/content/cards_edit.js'
import {ConnectedMyProject} from  '../component/content/project.js'
import {ConnectedMyProjectEdit} from  '../component/content/project_edit.js'
import {ConnectedConfig }   from '../component/content/config_page.js'
import {KonvaAppWithLoop } from '../component/content/konva_app.js'



function Index() {
  return <h2>Home</h2>;
}
const WithRouterConnectedMyProject = withRouter(ConnectedMyProject)
class ProjectWithLayout extends Component {
  render (){
    return <WithRouterConnectedMyLayout>
      <WithRouterConnectedMyProject/>
    </WithRouterConnectedMyLayout>
  }         
}

const WithRouterConnectedMyProjectEdit = withRouter(ConnectedMyProjectEdit)
class ProjectEditWithLayout extends Component {
  render (){
    return <WithRouterConnectedMyLayout>
      <WithRouterConnectedMyProjectEdit/>
    </WithRouterConnectedMyLayout>
  }         
}

const WithRouterConnectedConfig = withRouter(ConnectedConfig)
class ConfigWithLayout extends Component {
  render (){
    return <WithRouterConnectedMyLayout>
      <WithRouterConnectedConfig/>
    </WithRouterConnectedMyLayout>
  }         
}

const WithRouterConnectedMap = withRouter(KonvaAppWithLoop)
class MapWithLayout extends Component {
  render (){
    return <WithRouterConnectedMyLayout>
      <WithRouterConnectedMap/>
    </WithRouterConnectedMyLayout>
  }         
}

const WithRouterConnectedEditConfig = withRouter(ConnectedMyRestConfig)
class EditConfigWithLayout extends Component {
  render (){
    return <WithRouterConnectedMyLayout>
      <WithRouterConnectedEditConfig/>
    </WithRouterConnectedMyLayout>
  }         
}

const WithRouterConnectedCard = withRouter(ConnectedMyCard)
class CardWithLayout extends Component {
  render (){
    return <WithRouterConnectedMyLayout>
      <WithRouterConnectedCard/>
    </WithRouterConnectedMyLayout>
  }         
}


class AppRouter extends Component {

render()  {
  return (

    <Router>
      <div>
        <Route path="/" exact component={Index} />
            <Switch>
            <Route path="/projects/" component={ProjectWithLayout} />
            <Route path="/project/:project_id" component={ProjectEditWithLayout}  />
            <Route path="/project/" component={ProjectEditWithLayout} />
            <Route path="/config/:project_id/" component={ConfigWithLayout} />
            <Route path="/map/:project_id/:card_id" component={MapWithLayout} />
            <Route path="/rest_config/:project_id/:record_id" component={EditConfigWithLayout} />
            <Route path="/rest_config/:project_id/" component={EditConfigWithLayout} />
            <Route path="/card/:project_id/:card_id" component={CardWithLayout} />
            <Route component={withRouter(ConnectedMyError)} />

            </Switch> 
      </div>
    </Router>
  );
 }

}



export {AppRouter}  
