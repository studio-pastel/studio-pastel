import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-404">
      <article>
        <div className="wrapper" style={{ textAlign: 'center' }}>
          <svg id="pastel_logo" width="45px" height="39.7px" viewBox="0 0 45 39.7" style={{ margin: '0 auto 30px' }}>
            <g>
              <title>Design Studio PASTEL Inc.</title>
              <polygon fill="#3E3E3E" points="45,39.7 39.3,39.7 39.3,1 45,0 " />
              <polygon fill="#3E3E3E" points="35.2,39.7 29.5,39.7 29.5,1 35.2,0 " />
              <polygon fill="#3E3E3E" points="25.3,39.7 19.7,39.7 19.7,3 25.3,6 " />
              <rect x="9.8" fill="#3E3E3E" width="5.7" height="39.7" />
              <polygon fill="#3E3E3E" points="5.7,39.7 0,39.7 0,3 5.7,1 " />
            </g>
          </svg>

          <h1>Design Studio PASTEL Inc.</h1>

          <p>
            Oooops, sorry.
            <br />
            The page you are looking for is gone...
          </p>

          <p className="p_404">
            <Link href="/">Please go back to home and get some rest.</Link>
          </p>
        </div>
      </article>
    </div>
  );
}
