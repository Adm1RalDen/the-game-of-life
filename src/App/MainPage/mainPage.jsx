import React from 'react'
class Grid extends React.Component {
    constructor (props) {
      super(props)
      this.changeGridCell = this.changeGridCell.bind(this)
    }
    changeGridCell (i, j) {
      this.props.change(i, j)
    }
    render () {
      let tableTemplate
      tableTemplate = this.props.prop.ArrayGrid.map((row, i) => {
        let rowsTemplate
        rowsTemplate = row.map((cols, j) => {
          return <td
            key={j}
            onClick={() => this.changeGridCell(i, j)}
            className={this.props.prop.ArrayGrid[i][j] ? 'green' : null}
          />
        })
        return <tr key={i}>{rowsTemplate}</tr>
      })
      return (
        <div>
        <table cellSpacing = "0">
          <tbody cellSpacing = "0">
            {tableTemplate}
          </tbody>
        </table>
        </div>
       
      )
    }
  }
class Body extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        sizeGrid: '10x20',
        ArrayGrid: [],
        plays: false,
        speed: 500,
        countGeneration: 0
      }
      this.handleChange = this.handleChange.bind(this)
      this.changeCell = this.changeCell.bind(this)
      this.createGrid = this.createGrid.bind(this)
      this.clearGrid = this.clearGrid.bind(this)
    }
    handleChange (e) {
      this.setState({
        sizeGrid: e.target.value,
        countGeneration: 0
      })
      this.createGrid(e.target.value)
      this.stop()
    }
    changeCell (i, j) {
      // console.log(i, j);
      let temp = this.state.ArrayGrid
      temp[i][j] = !temp[i][j]
      this.setState({
        ArrayGrid: temp
      })
    }
    createGrid (size) {
      let temp = size.split('x')
      let arr = []
      for (let i = 0; i < temp[0]; i++) {
        arr[i] = []
        for (let j = 0; j < temp[1]; j++) {
          arr[i][j] = false
        }
      }
      this.setState({
        ArrayGrid: arr
      })
    }
    componentWillMount () {
      this.createGrid(this.state.sizeGrid)
    }
    clearGrid () {
      this.createGrid(this.state.sizeGrid)
      this.setState({
        countGeneration: 0
      })
    }
    seedGeneration = () => {
      let temp = this.state.sizeGrid.split('x')
      let arr = []
      for (let i = 0; i < temp[0]; i++) {
        arr[i] = []
        for (let j = 0; j < temp[1]; j++) {
          if (Math.floor(Math.random() * 4) === 1) {
            arr[i][j] = true
          } else {
            arr[i][j] = false
          }
        }
      }
      this.setState({
        ArrayGrid: arr
      })
    }
    stop = () => {
      clearInterval(this.timerID)
      this.setState({
        plays: false
      })
    }
    letsGo = () => {
      if (this.state.plays === false) {
        this.setState({
          plays: true
        })
        this.timerID = setInterval(
          () => this.play(),
          this.state.speed
        )
      }
    }
  
    play = () => {
      let size = this.state.sizeGrid.split('x')
      let temp = JSON.parse(JSON.stringify(this.state.ArrayGrid))
      const arr = JSON.parse(JSON.stringify(this.state.ArrayGrid))
      for (let i = size[0] - 1; i >= 0; i--) {
        for (let j = size[1] - 1; j >= 0; j--) {
          let count = 0
          if (i > 0) if (arr[i - 1][j]) count++
          if (i > 0 && j > 0) if (arr[i - 1][j - 1]) count++
          if (i > 0 && j < size[1] - 1) if (arr[i - 1][j + 1]) count++
          if (j < size[1] - 1) if (arr[i][j + 1]) count++
          if (j > 0) if (arr[i][j - 1]) count++
          if (i < size[0] - 1) if (arr[i + 1][j]) count++
          if (i < size[0] - 1 && j > 0) if (arr[i + 1][j - 1]) count++
          if (i < size[0] - 1 && size[1] - 1) if (arr[i + 1][j + 1]) count++
          if (arr[i][j] && (count < 2 || count > 3)) temp[i][j] = false
          if (!arr[i][j] && count === 3) temp[i][j] = true
        }
      }
      let tempCountGeneration = this.state.countGeneration + 1
      this.setState({
        ArrayGrid: temp,
        countGeneration: tempCountGeneration
      })
    }
    fast = () => {
      let speeds = this.state.speed
      speeds -= 200
      this.setState({
        speed: speeds
      })
      clearInterval(this.timerID)
      this.timerID = setInterval(
        () => this.play(),
        speeds
      )
    }
    slow = () => {
      let speeds = this.state.speed
      speeds += 200
      this.setState({
        speed: speeds
      })
      clearInterval(this.timerID)
      this.timerID = setInterval(
        () => this.play(),
        speeds
      )
    }
    handleExit = () => {
      this.props.history.goBack();
    }
    render () {
      return (
        <div >
          
          <div className="header"><span>The Game of Life</span></div>
          <div className="button-menus">
            <div className="button" onClick={this.letsGo}>Play</div>
            <div className="button" onClick={this.stop}>Pause</div>
            <div className="button" onClick={this.clearGrid}>Clear</div>
            <div className="button" onClick={this.slow}>Slow</div>
            <div className="button" onClick={this.fast}>Fast</div>
            <div className="button" onClick={this.seedGeneration}>Seed</div>
            <select className="button " id="changeGrid" size="1" onChange={this.handleChange}>
              <option value="10x20">20x10</option>
              <option value="30x50">50x30</option>
              <option value="50x70">70x50</option>
            </select>
            <div className="button exit" onClick={this.handleExit}>Exit</div>
          </div>
          <div className="grid-main">
            <div id="feeld">
              <Grid prop={this.state} change={this.changeCell}/>
            </div>
          </div>
          <div className="header">Generation : {this.state.countGeneration}</div>
        </div>
      )
    }
  }
export default Body

  