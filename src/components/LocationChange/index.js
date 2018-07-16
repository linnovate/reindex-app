import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import Button from '@material-ui/core/Button';
import { updateSearchLocation } from 'utils/functions';




import './LocationChange.scss';

class LocationChange extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { open: false, change: false ,current: true };
    this.onChange = this.onChange.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.updateCity = this.updateCity.bind(this);
    this.updateSearchLocation = updateSearchLocation;
    this.city = '';
  }

  updateCity(city) {
    this.city = city.text;
    updateSearchLocation('lat', '');
    updateSearchLocation('lon', '');
    updateSearchLocation('location', this.city, false, true);
  }

  onChange(type) {
    if (type === 'change')
      this.setState({ change: true,  current: false });
    else if (type === 'all') {
      this.city = 'all';
      this.setState({ change: false ,current: false });
    }
    else {
      this.city = '';
      this.setState({ change: false ,current: true });
    }
  }

  close() {
    this.setState({ open: false });
    if (this.city)
      if (this.city === 'all') {
        updateSearchLocation('lat', '');
        updateSearchLocation('lon', '');
      }
      else updateSearchLocation('location', this.city, false, true);
    this.props.handleClose(this.city);

  }
  open() {
    this.setState({ open: true });
  }

  render() {
    return (
      <div className="loc">
        {/* <Button label='שנה מיקום' onClick={this.open} labelStyle={{ paddingRight: 11, paddingLeft: 11, fontSize: 18 }} /> */}
        <div className="location-change">
          <Drawer
            docked={false}
            width={275}
            overlayClassName="overlay"
            containerClassName="container"
            open={this.state.open}
            openSecondary
            onRequestChange={(open) => this.setState({ open: false })}
          >
            <div className="wrapper-location">
              <div className="title">שינוי מקום</div>
              <form name='myform'>
                <div className="change">
                  <input type="radio" name='myradio' value="1" onClick={() => this.onChange('change')} />
                  <label>שנה מיקום</label>
                  {this.state.change ? <AutoComplete
                    fullWidth
                    hintText="חפש לפי אזור/ישוב"
                    dataSource={this.props.filters.cities}
                    filter={AutoComplete.fuzzyFilter}
                    onNewRequest={(chosenRequest, index) => {this.updateCity(chosenRequest)}}
                    maxSearchResults={10}
                    menuStyle={{ maxHeight: '300px' }}
                    openOnFocus
                  /> : ''
                  }
                </div>
                <div className="change">
                  <input type="radio" name='myradio' value="2" checked={this.state.current} onClick={() => this.onChange('current')} />
                  <label>מיקומך הנוכחי</label>
                </div>
                <div className="change">
                  <input type="radio" name='myradio' value="3" onClick={() => this.onChange('all')} />
                  <label>כל הארץ</label>
                </div>

              </form>

            </div>
            <Button variant="contained" className="submitBtn" type="submit" labelStyle={{ fontSize: 16 }} overlayStyle={{ backgroundColor: 'transparent' }} onClick={() => this.close()} >עדכן</Button>

          </Drawer>
        </div>
      </div>
    );
  }
}

LocationChange.propTypes = {
  onNewRequest: PropTypes.func,
  pageState: PropTypes.string,
  filters: PropTypes.object,

};
export function mapStateToProps(state) {
  return {
    categories: state.search.subCategories,
    search: state.search.search,
    filters: state.search.filters,
    hierarchyFiltersCategories: state.search.hierarchySubCategories,
  };
}
export function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationChange);


// onNewRequest={this.props.onNewRequest}
                    // onUpdateInput={(searchText) => this.updateCity(searchText)}
