import { CampaignProps } from '../../../screens/campaigns/campaigns.api';

export default function CampaignComponent({
  title,
  subtitle,
  description,
  requiredDocuments,
  imageUrl,
}: CampaignProps) {
  const styles = {
    mainContainer: {
      padding: '30px',
    },
    campaigns: {
      display: 'flex',
      height: '100%',
      flexDirection: 'row' as const,
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: '0 auto',
    },
    imageContainer: {
      maxHeight: '500px',
      maxWidth: '500px',
      overflow: 'hidden',
      borderRadius: '10px 0 0 10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    campaignImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
    descriptionContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'space-between',
      flex: 1,
      padding: '20px',
      height: '500px',
      backgroundColor: '#ffffff',
      borderRadius: '0 10px 10px 0',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    topContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
    },
    topH1: {
      fontSize: '2.5rem',
      marginBottom: '0.5rem',
      color: 'var(--primary-color)',
    },
    topH2: {
      fontSize: '2rem',
      marginBottom: '1rem',
      color: '#786456',
    },
    topP: {
      fontSize: '1.6rem',
      marginBottom: '1rem',
      lineHeight: 1.6,
    },
    bottomContainer: {
      display: 'flex',
      flexDirection: 'row' as const,
      alignItems: 'flex-start',
    },
    documentContainer: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    actionContainer: {
      width: '50%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '10px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1.6rem',
      backgroundColor: 'var(--primary-color)',
      color: 'white',
      border: '2px solid var(--primary-color)',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.campaigns}>
        <div style={styles.imageContainer}>
          <img
            src={imageUrl}
            alt="Imagem da campanha"
            style={styles.campaignImage}
          />
        </div>
        <div style={styles.descriptionContainer}>
          <div style={styles.topContainer}>
            <h1 style={styles.topH1}>{title}</h1>
            <h2 style={styles.topH2}>{subtitle}</h2>
            <p style={styles.topP}>{description}</p>
          </div>
          <div style={styles.bottomContainer}>
            <div style={styles.documentContainer}>
              <p>Documentos Necessários:</p>
              <ul>
                {requiredDocuments.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>
            <div style={styles.actionContainer}>
              <p>Clique aqui para se cadastrar nessa campanha</p>
              <button
                style={styles.button}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#000';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.9)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
