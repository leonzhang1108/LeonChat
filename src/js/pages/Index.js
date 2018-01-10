import { SegmentedControl } from 'antd'
import 'style/pages/index'
import { observer, inject } from 'mobx-react'
import Layout from 'components/Layout'

@inject("store")
@observer
class Index extends React.Component {

  constructor(props) {
    super(props)
  }

  onChange = (e) => {
    const { changeLocale } = this.props.store
    const index = e.nativeEvent.selectedSegmentIndex
    changeLocale(index)
  }

  render() {
    const { lang } = this.props.store
    return (
      <SegmentedControl
        style={{ width: '80%' }}
        values={['切换到英文', 'Change to Chinese']}
        selectedIndex={lang === 'zh' ? 1 : 0}
        onChange={this.onChange}
      />
    )
  }
}

export default Layout(Index)