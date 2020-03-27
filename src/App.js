import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import Basic from "./examples/Basic"
import Custom from "./examples/Custom"
import Interactive from "./examples/Interactive"

const examples = [
  {
    id: 0,
    name: "Basic example",
    to: "/",
  },
  {
    id: 1,
    name: "Custom example",
    to: "/custom",
  },
  {
    id: 2,
    name: "Interactive example",
    to: "/interactive",
  },
]

function App() {
  const reversedExamples = [...examples].reverse()
  return (
    <div className="App">
      <Router>
        <div className="nav">
          <div className="nav-block nav-block--t">
            <h2 className="title">React Multi Cursor</h2>
            {examples.map(({ id, name, to }) => (
              <Link key={id} to={to}>
                <div className="nav-item multi-cursor-item" key={id}>
                  {name}
                </div>
              </Link>
            ))}
          </div>
          <Switch>
            <Route exact path="/">
              <Basic />
            </Route>
            <Route path="/custom">
              <Custom />
            </Route>
            <Route path="/interactive">
              <Interactive />
            </Route>
          </Switch>
          <div className="nav-block nav-block--b">
            {reversedExamples.map(({ id, name, to }) => (
              <Link key={id} to={to}>
                <div className="nav-item multi-cursor-item" key={id}>
                  {name}
                </div>
              </Link>
            ))}
            <h2 className="title">React Multi Cursor</h2>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
