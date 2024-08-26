import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import mypic from '../../assets/mypic.jpg';
import { DataContext } from '../../components/context/DataContext';
import Navbar from '../../components/Navbar/Navbar';
import Pagination from '../../components/Pagination/Pagination';
import './Home.css';

const Home = () => {
  const [datas, setDatas] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [editingId, setEditingId] = useState(null);  // Track which item is being edited
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const { formatDate } = useContext(DataContext);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:4000/api/data/get');
    setDatas(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addNewData = async () => {
    const newData = {
      title: `New Title ${datas.length + 1}`,
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit',
      date: new Date().toISOString(),
    };

    try {
      await axios.post('http://localhost:4000/api/data/create', newData);
      fetchData();
      alert('Data added successfully!');
    } catch (error) {
      console.error('Error adding new data:', error);
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const saveEdit = async (id) => {
    try {
      const updatedData = {
        ...datas.find(item => item._id === id),
        title: editTitle,
        description: editDescription,
      };
      await axios.put(`http://localhost:4000/api/data/update/${id}`, updatedData);
      fetchData();
      setEditingId(null);
      alert('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="block">
        <div className="left-block">
          <div className="btn-search">
            <button onClick={addNewData}>TODO</button>
            <img src={mypic} alt="" />
          </div>
          <div className="scroll-container">
            {currentItems.map((item, index) => (
              <div key={index} className="main-data" onClick={() => setSelectedData(item)}>
                {editingId === item._id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                    <button onClick={() => saveEdit(item._id)}>Save</button>
                  </>
                ) : (
                  <>
                    <h2 onClick={() => startEdit(item)}>{item.title}</h2>
                    <div className="my-text">
                      <p className="desc" onClick={() => startEdit(item)}>{item.description}</p>
                      <p className="date">{formatDate(item.date)}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <Pagination
            totalItems={datas.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>

        {selectedData ? (
          <div className="right-block">
            <h1>{selectedData.title}</h1>
            <pre>
              <p>%% && ** $$ @@ () ^^ !!</p>
            </pre>
            <hr />
            <p>{selectedData.description}</p>
          </div>
        ) : (
          <div className="right-block">
            <h1>New Additions</h1>
            <p className="right-block-decs">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="right-block-hr">
              <hr />
            </div>
            <p className="right-block-decs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, reprehenderit!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
