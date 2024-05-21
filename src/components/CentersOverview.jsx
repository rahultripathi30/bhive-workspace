import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';

const CentersOverview = () => {
  const { centers, status } = useSelector((state) => state.centers);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading centers.</div>;
  const image = 'src/static_assets/0a74575ca6004b4bb20dcd131afc5849.jpg'

  return (
    <Grid container spacing={2}>
      {centers.map((center) => (
        <Grid item xs={12} sm={6} md={4} key={center.id}>
          <Card>
            {center.images && center.images.length > 0 && (
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={center.name}
              />
            )}
            <CardContent>
              <Typography variant="h5">{center.name}</Typography>
              <Typography>{center.address}</Typography>
              <Typography>Day Pass: ₹{center.dayPass}</Typography>
              <Typography>Bulk Pass: ₹{center.bulkPass}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CentersOverview;
