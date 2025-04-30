import './List.scss';

const options = [
  { id: 'option1', label: 'Drama', icon: '🎭' },
  { id: 'option2', label: 'Comedy', icon: '🤹' },
  { id: 'option3', label: 'Action', icon: '🥷' },
  { id: 'option4', label: 'Thriller', icon: '🧟' },
  { id: 'option5', label: 'Science fiction', icon: '👨‍🔬' },
];

type ListProps = {
  selectedOption: string;
  handleChange: (label: string) => void;
};

const List = ({ selectedOption, handleChange }: ListProps) => {
  return (
    <div className="list-container">
      <h2>Your favorite movie genre?</h2>
      <ul className="option-list">
        {options.map((opt) => (
          <li
            key={opt.id}
            className={`option-item ${selectedOption === opt.label ? 'active' : ''}`}
            onClick={() => handleChange(opt.label)}
          >
            <span className="movie-genre">
              <span className="icon">{opt.icon}</span>
              <span className="label-text">{opt.label}</span>
            </span>
            <span className="genre-button">
              {selectedOption === opt.label && (
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 3.8125L4.07107 6.88357L9.38478 1.56986" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
