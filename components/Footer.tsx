export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <small>Copyright &copy; 2011-{year} Design Studio PASTEL Inc. All Rights Reserved.</small>
    </footer>
  );
}
