import BookList from "./components/BookList";
import AddBookModal from "./components/AddBookModal";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="mt-4 flex flex-col items-center gap-4">
        <AddBookModal />
        <BookList />
      </div>
    </div>
  );
}
