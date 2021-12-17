/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { object } from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import MainLayout from '../components/common/Layout';
import { PageGrid } from '../components/roadmap/Layout';
import Planned from '../components/roadmap/planned/Planned';
import InProgress from '../components/roadmap/inProgress/InProgress';
import Live from '../components/roadmap/live/Live';
import Header from '../components/roadmap/Header';
import NewFeedback from '../components/newFeedback/NewFeedback';
import { Layout } from '../components/feedbackForm/Common';
import {
  Container,
  BulletPoint,
  RoadMapTxt,
  Content,
  FilterContainer,
  Actions,
  Comment,
  CommentIcon,
} from '../components/roadmap/Common';
import Tags from '../components/common/ui/Tags';
import Upvotes from '../components/common/ui/Upvotes';

const ItemHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  h3 {
    color: #3a4374;
    padding-bottom: 4px;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 23px;
    color: #647196;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export default function Roadmap({ feedback, serverUser }) {
  const planned = feedback.filter((feed) => feed?.status === 'planned');
  const live = feedback.filter((feed) => feed?.status === 'live');
  const inProgress = feedback.filter((feed) => feed?.status === 'in-progress');
  const [showEditPage, setShowEditPage] = useState(false);
  const [columns, setColumns] = useState({
    Planned: {
      items: planned,
      heading: 'Planned',
      description: 'Ideas prioritized for research',
    },
    'In-Progress': {
      items: inProgress,
      heading: 'In-Progress ',
      description: 'Currently being developed',
    },
    Live: {
      items: live,
      heading: 'Live',
      description: 'Released features',
    },
  });

  const toggleEdit = () => {
    setShowEditPage(!showEditPage);
  };

  const Card = styled(Container)`
    border-top: solid #f49f85 6px;
  `;

  // const onDragEnd = (result, columns, setColumns) => {

  // };

  return (
    <>
      {showEditPage ? (
        <Layout>
          <NewFeedback />
        </Layout>
      ) : (
        <MainLayout>
          <Header toggleEdit={toggleEdit} />

          <PageGrid>
            {Object.values(columns).map(({ heading, description, items }) => (
              <ItemHeader>
                <h3>
                  {heading} ({items?.length})
                </h3>
                <p>{description}</p>
              </ItemHeader>
            ))}

            <DragDropContext onDragEnd={(result) => console.log(result)}>
              {Object.entries(columns).map(([key, value]) => (
                <Droppable droppableId={key} key={key}>
                  {(provided, snapshot) => (
                    <ItemContainer
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        height: ' 100%',
                      }}
                    >
                      {value.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <Container
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card>
                                <RoadMapTxt>
                                  <div>
                                    <BulletPoint color="#F49F85" />
                                    <p>Planned</p>
                                  </div>
                                </RoadMapTxt>
                                <Content>
                                  <Link to={`/feedback-list/${planned?.id}`}>
                                    <h3>{item?.title}</h3>
                                  </Link>

                                  <p>{item?.description}</p>
                                </Content>
                                <FilterContainer>
                                  <Tags text={item?.category} />
                                </FilterContainer>

                                <Actions>
                                  <Upvotes feedback={item} serverUser={serverUser} />
                                  <Comment>
                                    <CommentIcon />
                                    <p>{item?.comments?.length}</p>
                                  </Comment>
                                </Actions>
                              </Card>
                            </Container>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ItemContainer>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </PageGrid>

          {/* <PageGrid>
            <ItemContainer>
              <Planned planned={planned} serverUser={serverUser} />
            </ItemContainer>

            <ItemContainer>
              <InProgress inProgress={inProgress} serverUser={serverUser} />
            </ItemContainer>

            <ItemContainer>
              <Live live={live} serverUser={serverUser} />
            </ItemContainer>
          </PageGrid> */}
        </MainLayout>
      )}
    </>
  );
}
