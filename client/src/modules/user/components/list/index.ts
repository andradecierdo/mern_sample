import UsersByParentList from './UsersByParentPage'
import { connect } from 'react-redux'

const mapStateToProps = (state: { user: object }): { user: object } => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(UsersByParentList)
