import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';
import {withRouter} from 'react-router-dom';

const CreateProfile = ({createProfile, history}) => {
    const [formData, setFormData] = useState({
        bio:'',
        youtube:'',
        instagram:'',
        bandcamp:'',
        soundcloud:'',
        spotify:'',
        appleMusic:'',
        facebook:''
    });

    const {
        bio,
        youtube,
        instagram,
        bandcamp,
        soundcloud,
        spotify,
        appleMusic,
        facebook
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    }

    return (
        <Fragment>
            <form className="profile" onSubmit={(e => onSubmit(e))}>
                <textarea name="bio" placeholder="Your biography" value={bio} onChange={e => onChange(e)}></textarea>
                <input name="youtube" type="text" placeholder="YouTube URL" value={youtube} onChange={e => onChange(e)}/>
                <input name="instagram" type="text" placeholder="Instagram URL" value={instagram} onChange={e => onChange(e)}/>
                <input name="bandcamp" type="text" placeholder="Bandcamp URL" value={bandcamp} onChange={e => onChange(e)}/>
                <input name="soundcloud" type="text" placeholder="Soundcloud URL" value={soundcloud} onChange={e => onChange(e)}/>
                <input name="spotify" type="text" placeholder="Spotify URL" value={spotify} onChange={e => onChange(e)}/>
                <input name="appleMusic" type="text" placeholder="Apple Music URL" value={appleMusic} onChange={e => onChange(e)}/>
                <input name="facebook" type="text" placeholder="Facebook URL" value={facebook} onChange={e => onChange(e)}/>
                <input type="submit" />
            </form>
        </Fragment>
    )
}

CreateProfile.propTypes = { createProfile: PropTypes.func.isRequired }

export default connect(null, {createProfile})(withRouter(CreateProfile));
