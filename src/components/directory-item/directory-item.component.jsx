import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles.jsx';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({category}) => {
    const { title, imageUrl, route } = category;
    const navigate = useNavigate();
    
    const onNavigateHnadler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHnadler}>
            <BackgroundImage image={imageUrl}></BackgroundImage>
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;