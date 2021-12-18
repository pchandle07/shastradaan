import React, { useState } from 'react';
import { Grid, Dialog, DialogTitle } from '@material-ui/core';
import PlaceSearchBox from './PlaceSearchBox';
import Menu from './Menu';
import { useNavigate } from "react-router-dom";
import { get } from 'lodash';
import "./Home.css";
import BookDist from "./BookDist.jpg";




const Home = () => {
    const [schools, setSchools] = useState([])
    const [city, setCity] = useState("");
    const navigate = useNavigate();
    const [openDialog, toggleDialog] = useState(false);
    const [finalPlace, setFinalPlace] = useState();
    console.log({ finalPlace });

    if (finalPlace && get(finalPlace, 'photos[0]')) {
        const placeImageUrl = get(finalPlace, 'photos[0]').getUrl();
        if (placeImageUrl) {
            localStorage.setItem('placeImageUrl', placeImageUrl)
        } else {
            localStorage.removeItem('placeImageUrl');
        }
    } else if (finalPlace && !get(finalPlace, 'photos[0]')) {
        localStorage.removeItem('placeImageUrl');
    }
    return (
        <div>
            {/* {finalPlace &&
                <Dialog PaperProps={{ style: { borderRadius: '4px' } }} onClose={() => toggleDialog(false)} aria-labelledby="simple-dialog-title" maxWidth="md" open={openDialog}>
                    
                </Dialog>
            } */}
            <Menu></Menu>

            <main className="home-main">

                <div className="main-wrap">
                    <Grid container spacing={1}>
                        <Grid item sm={3} xs={12}>
                            {/* <img src={BookDist} alt="i/mg" width="100%"></img> */}

                        </Grid>
                        <Grid className="place-search-wrap align-center" item sm={9} xs={12}>
                            <h2 className="main-heading"> Donate for your school! </h2>
                            <PlaceSearchBox toggleDialog={toggleDialog} finalPlace={finalPlace} setFinalPlace={setFinalPlace} schools={schools} city={city} setSchools={setSchools} setCity={setCity} />
                            {finalPlace &&
                <div PaperProps={{ style: { borderRadius: '4px' } }} onClose={() => toggleDialog(false)} aria-labelledby="simple-dialog-title" maxWidth="md" open={openDialog}>
                    <div className="dialog-content school-info">
                        <h3>{finalPlace.name}</h3>
                        <div>{finalPlace.formatted_address}</div>

                        {/* {get(finalPlace, 'photos[0]') &&
                            <img src={get(finalPlace, 'photos[0]').getUrl()} className="school-image" alt="school"></img>
                        } */}

                        <button
                            className="primary-button"
                            // style={{ margin: '20px 50px' }}
                            //   disabled={!(placeAddress && placeName && placeid)}
                            onClick={() => {
                                navigate(`/fundraiser/${finalPlace.place_id}`);
                            }}
                        >Contribute Now!</button>
                    </div>
                </div>
            }
                        </Grid>
                    </Grid>

                    {/* Right side image will come here */}
                    {/* <>
                            <div className="left__block">
                                    
                                    <img src={BookDist} alt="img" width="100%"></img>
                            </div>

                            <div className="right__block">
                            
                                <h2>  Donate For Your School</h2>

                            <PlaceSearchBox />
                            
                            </div>
                           
            </> */}
                </div>



            </main>
        </div>
    );
};

export default Home;