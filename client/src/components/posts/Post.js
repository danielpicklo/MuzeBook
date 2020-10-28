import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {connect} from 'react-redux';

const Post = ({auth, post:{_id,text,name,avatar,user,loves,comments,date}}) => {
    return (
        <div className="post">
            <Link to=''><img class="profile-image" src={avatar}/></Link>
            <h4>{name}</h4>
            <div className="post-content">
                <p>{text}</p>
            </div>
            <div className="date">
                <p>Shared <Moment format="MM/DD/YYYY">{date}</Moment></p>
            </div>
            {!auth.loading && user === auth.user._id &&(
                <button>X</button>
            )}
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, {})(Post);
