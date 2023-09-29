import React, { useEffect, useState } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';


const Stats = () => {
  const doughnutOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 16, // Taille de police pour les labels
          },
        },
      },
    },
  };
  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 12, // Taille de police pour les labels
          },
        },
      },
    },
  };
    const [chartData, setChartData] = useState({
        doughnutDataGlobal: {
            labels: ['Tâches terminées', 'Tâches restantes'],
            datasets: [{ data: [], backgroundColor: [] }],
          },
          doughnutDataPerList: [],
      });

  useEffect(() => {
    // Fonction pour récupérer les statistiques depuis l'API
    const fetchTaskListStats = async() => {
        try{
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/liste/stats', {
            headers: {
              Authorization: `Bearer ${token}`
              // Ajouter votre token d'authentification ici si nécessaire
            },
          });
        console.log(response);
          const { listStats, percentageCompletedGlobal} = response.data;

          // Créez les données pour le diagramme en pourcentage (Doughnut)
          const doughnutDataGlobal = {
            labels: ['Tâches terminées', 'Tâches restantes'],
            datasets: [
              {
                data: [percentageCompletedGlobal, 100 - percentageCompletedGlobal],
                backgroundColor: ['#36A2EB', '#FFCE56'],
              },
            ],
          };

           // Données pour chaque liste
        const doughnutDataPerList = listStats.map((listStat) => ({
          labels: ['Tâches terminées', 'Tâches restantes'],
          datasets: [
            {
              data: [listStat.percentageCompleted, 100 - listStat.percentageCompleted],
              backgroundColor: ['#36A2EB', '#FFCE56'],
            },
          ],
          title: listStat.listTitle,
        }));
     

          // Mettez à jour le state avec les données des diagrammes
          setChartData({ doughnutDataGlobal, doughnutDataPerList });
          console.log({ doughnutDataGlobal, doughnutDataPerList });
         
        } catch(error){
          console.error('Erreur lors de la récupération des statistiques :', error);
        };
    };

    // Appelez la fonction pour récupérer les statistiques
    fetchTaskListStats();
  }, []);

  return (
    <div className='section-stats'>
      {chartData.doughnutDataPerList.length > 0 ? (
        <>
          <h3>Pourcentage de tâche terminé par liste</h3>
          <div className='bloc-stats-list'>
            {chartData.doughnutDataPerList.map((data, index) => (
              <div  key={index}>
                <h4>{data.title}</h4>
                <Pie className='stats stat-list' data={data} options={pieOptions} />
              </div>
            ))}
          </div>
        </>
      ): (
        <p className='msg-creat-list'>Une fois vos listes de tâches créées, vous verrez l'ensemble des statistiques les concernant dans cette partie.</p>
      )}

      {chartData.doughnutDataGlobal && chartData.doughnutDataGlobal.datasets[0].data[0] > 0 ? (
        <>
          <h3>Pourcentage Global</h3>
          <Doughnut className='stats stat-global' data={chartData.doughnutDataGlobal} options={doughnutOptions} />
        </>
      ) : null}
    </div>
  );
};

export default Stats;