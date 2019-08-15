import Layout from '../components/Layout';
import Carousel from '../components/Carousel';

const Index = (props) => (
	<div>
		<Layout title={props.title}>
			<div className="container">
				<div className="row">
					<Carousel />
				</div>
			</div>
		</Layout>
	</div>
);

Index.getInitialProps = async function() {
    return {
		title: 'Weekend Warriors'
    };
}

export default Index;