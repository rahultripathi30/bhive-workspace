import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import mapImage from '../static_assets/mapImage.png';
import { styled } from '@mui/system';

// Haversine formula to calculate distance between two coordinates
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (x) => (x * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance.toFixed(2); // Returns distance in kilometers with 2 decimal places
};

const importImage = (imagePath) => {
  try {
    return require(`../${imagePath}`);
  } catch (err) {
    console.error(`Error loading image: ${imagePath}`, err);
    return null;
  }
};

const CardHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '4px 8px',
  backgroundColor: 'white',
  color: 'black',
  position: 'relative',
  top: '-24px',
  zIndex: 1,
});

const DistanceBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'grey',
  padding: '4px',
  borderRadius: '4px',
  color: 'white',
});

const DiscountBadge = styled(Box)({
  position: 'absolute',
  bottom: '8px',
  left: '8px',
  backgroundColor: '#f0ad4e',
  color: 'white',
  padding: '4px 8px',
  borderRadius: '4px',
});

const CentersOverview = () => {
  const { centers, status } = useSelector((state) => state.centers);

  // Coordinates of the reference location (for example, user's current location)
  const userLatitude = 12.9715987; // Replace with dynamic value if needed
  const userLongitude = 77.5945627; // Replace with dynamic value if needed

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading centers.</div>;

  return (
    <Grid container spacing={2}>
      {centers.map((center) => {
        const distance = haversineDistance(userLatitude, userLongitude, center.latitude, center.longitude);

        return (
          <Grid item xs={12} sm={6} md={4} key={center.id}>
            <Box sx={{ position: 'relative', paddingTop: '40px' }}>
              <CardHeader>
                <Typography variant="body2">{center.name}</Typography>
                <DistanceBox>
                  <mapImage/>
                  <Typography variant="body2">{distance} Kms</Typography>
                </DistanceBox>
              </CardHeader>
              <Card sx={{ position: 'relative' }}>
                {center.images && center.images.length > 0 && (
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={importImage(center.images[0])}
                      alt={center.name}
                    />
                    <DiscountBadge>
                      <Typography variant="caption">20% Discount</Typography>
                    </DiscountBadge>
                  </Box>
                )}
                <CardContent>
                  <Typography variant="body2">{center.address}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
                    <Box>
                      <Typography variant="body1">Day Pass</Typography>
                      <Typography variant="h6">₹{center.day_pass_price}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1">Bulk Pass</Typography>
                      <Typography variant="h6">₹{(center.day_pass_price * 10 * 0.8).toFixed(2)}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CentersOverview;