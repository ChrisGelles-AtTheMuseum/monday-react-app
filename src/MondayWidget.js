import React, { useEffect, useState } from 'react';

const MondayWidget = () => {
  const [context, setContext] = useState({});
  const [mondaySdk, setMondaySdk] = useState(null);

  useEffect(() => {
    if (window.monday) {
      const monday = window.monday;
      setMondaySdk(monday);

      // Ensuring monday is available before setting up listeners
      monday.listen('context', (res) => {
        if (res.data) {
          setContext(res.data);
        }
      }).catch(e => console.error('Error setting up context listener:', e));
    } else {
      console.error('Monday SDK not loaded');
    }
  }, []);

  return (
    <div>
      <h1>Monday.com Widget</h1>
      <p>Context ID: {context.boardIds ? context.boardIds.join(', ') : 'No context yet'}</p>
    </div>
  );
};

export default MondayWidget;
