import "./navigation.css";

type Props = {
  userName: string;
  onLogout: () => void;
};

export default function Navigation({ userName, onLogout }: Props) {
  return (
    <header className="game-navbar">
      <div className="nav-left">Привет, {userName}</div>

      <div className="nav-center">Своя игра</div>

      <div className="nav-right">
        <button className="nav-btn logout" onClick={onLogout}>
          выход
        </button>
      </div>
    </header>
  );
}

