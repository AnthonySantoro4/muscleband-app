import React, { useEffect, useState } from 'react';

const PreviousTrackings = () => {
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEMGHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("🧪 LocalStorage User:", user);

        if (!user || !user._id) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const res = await fetch(`http://192.168.4.94:5002/api/emg/fetch/${user._id}`);
        const data = await res.json();

        if (res.ok) {
          // ✅ Sort by newest to oldest
          const sorted = [...data].sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          setHistory(sorted);
        } else {
          throw new Error(data.message || 'Fetch failed');
        }
      } catch (err) {
        setError("❌ Failed to fetch EMG history.");
        console.error("❌ Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEMGHistory();
  }, []);

  // Pagination Logic
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = history.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(history.length / recordsPerPage);

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.title}>🧠 Previous EMG Sessions</h2>

      {loading && <p style={styles.loading}>⏳ Loading data...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {!loading && !error && history.length === 0 && (
        <p style={styles.noData}>No EMG records found yet.</p>
      )}

      {!loading && history.length > 0 && (
        <>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Left Bicep</th>
                  <th style={styles.th}>Right Bicep</th>
                  <th style={styles.th}>% Difference</th>
                  <th style={styles.th}>Severity</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item, index) => (
                  <tr key={index}>
                    <td style={styles.td}>
                      {item.timestamp
                        ? new Date(item.timestamp).toLocaleString()
                        : 'N/A'}
                    </td>
                    <td style={styles.td}>
                      {item.left_bicep?.toFixed(2) ?? 'N/A'}
                    </td>
                    <td style={styles.td}>
                      {item.right_bicep?.toFixed(2) ?? 'N/A'}
                    </td>
                    <td style={styles.td}>
                      {item.percentage_difference?.toFixed(2) ?? 'N/A'}%
                    </td>
                    <td
                      style={{
                        ...styles.td,
                        ...getSeverityStyle(item.severity_grade),
                      }}
                    >
                      {item.severity_grade || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div style={styles.pagination}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={styles.pageButton}
            >
              ◀ Prev
            </button>
            <span style={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              style={styles.pageButton}
            >
              Next ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ========== Styles ==========
const styles = {
  pageContainer: {
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
    background: 'linear-gradient(to bottom, #a1c4fd, #c2e9fb)',
    minHeight: '100vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '28px',
    color: '#333',
  },
  loading: {
    textAlign: 'center',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '16px',
  },
  noData: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#555',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  th: {
    backgroundColor: '#f4f6f8',
    padding: '15px',
    fontSize: '16px',
    borderBottom: '2px solid #ddd',
    textAlign: 'left',
  },
  td: {
    padding: '15px',
    borderBottom: '1px solid #eee',
    fontSize: '15px',
    color: '#333',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    gap: '10px',
  },
  pageButton: {
    padding: '8px 16px',
    fontSize: '14px',
    borderRadius: '6px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  pageInfo: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

const getSeverityStyle = (grade) => {
  switch (grade?.toLowerCase()) {
    case 'low':
      return { color: 'green', fontWeight: 'bold' };
    case 'moderate':
      return { color: 'orange', fontWeight: 'bold' };
    case 'high':
      return { color: 'red', fontWeight: 'bold' };
    default:
      return { color: '#333' };
  }
};

export default PreviousTrackings;
