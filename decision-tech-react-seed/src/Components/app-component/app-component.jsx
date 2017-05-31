import React from 'react';
var service = function () {
  return {
    fetchDeals: () => {
      return fetch('/assets/deals.json')
        .then(res => res.json())
        .then(rest => rest.deals)
    }
  }
}();

const filterOptions = {
  // To make it more extensible, we could use objects instead
  // such as: {displayName: 'Broadband', filterValue: 'Broadband', ...}
  // but it seems the display value is the same as the raw data in the
  // JSON, so I opted for compactness
  type: [
    'Broadband',
    'TV',
    'Mobile'
  ],
  speed: [
    76,
    52,
    17
  ]
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'deals': [],
      menuOpen: false,
      selectedBroadbandFilterTypes: {}
    };
    service
      .fetchDeals()
      .then(deals => {
        this.setState({'deals': deals})
      })
  }
  onBurgerClick() {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }
  render() {
    return (
      <div>
        <div id="top-bar">
          <a href="/" id="logo"></a>
          <svg
            height="32px"
            version="1.1"
            viewBox="0 0 32 32"
            width="32px"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            onClick={this
            .onBurgerClick
            .bind(this)}>
            <path
              d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"/>
          </svg>
        </div>
        {/*{JSON.stringify(this.state.deals)}*/}
        {/* Though I could use id as key as they should be unique, but there is at least one duplicate */}
        {this.state.deals.map((deal, i) => <div key={i} className="deal ">
          <div>{deal.title}</div>
          <div>{deal.contractLength}months</div>
          <div>{deal.speed.label} MB</div>
          <div>{deal.usage.label}</div>
          <img src={deal.offer.smallLogo} alt={deal.offer.title} title={deal.offer.title} />
          {deal.popularChannels ? deal.popularChannels.map(channel => <img src={channel.logo} alt={channel.name} title={channel.name} />) : null}
          {deal.mobile ? <div>
              <div>Data: {deal.mobile.data.label}</div>
              <div>Minutes: {deal.mobile.minutes.label}</div>
              <div>Text: {deal.mobile.texts.label}</div>
              <div>Connection: {deal.mobile.connectionType.label}</div>
            </div> : null}
          <div>£{deal.prices[0].totalContractCost}</div>
          </div>)}
        <div
          id="overlay"
          className={this.state.menuOpen
          ? 'open'
          : ''}>
            <ul>
              {filterOptions.type.map(broadbandType => <li key={broadbandType}>
                <input 
                type="checkbox"
                value={broadbandType}
                onChange={()=> {
                  const { selectedBroadbandFilterTypes } = this.state
                  selectedBroadbandFilterTypes[broadbandType] = !selectedBroadbandFilterTypes[broadbandType]
                  this.setState({selectedBroadbandFilterTypes})
                }}/> {broadbandType}
              </li>
              )}
            </ul>
            <div>Speed</div>
            <select value={this.state.value} onChange={this.handleChange}>
              {filterOptions.speed.map(speed => <option value={speed}>{speed}</option>)}
            </select>
          </div>
      </div>
    );
  }
}