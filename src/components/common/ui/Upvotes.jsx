/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GoChevronUp } from 'react-icons/go';
import { useMutation, useQueryClient } from 'react-query';
import feedbackService from '../../../services/feedback';
import userService from '../../../services/user';

const Button = styled.div`
  width: 40px;
  height: 53px;
  transition: all 0.3s ease;
  background: ${(props) => props.bg || '#f2f4fe'};
  border-radius: 10px;
  font-weight: 700;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  letter-spacing: -0.180556px;
  color: ${(props) => props.color || '##3a4374'};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;

  &:hover {
    background: #cfd7ff;
    transform: translateX(0rem) translateY(-0.125rem);
  }

  &:active {
    background: #4661e6;
    color: #ffffff;
    transform: translateX(0rem) translateY(-0.125rem);
  }
`;

const Arrow = styled(GoChevronUp)`
  font-size: 16px;
  margin-bottom: 2px;
`;

const Upvotes = ({ feedback, serverUser }) => {
  const queryClient = useQueryClient();
  const upVote = useMutation((vote) => feedbackService.update(vote), {
    onSuccess: () => {
      queryClient.invalidateQueries('feedbackList');
      queryClient.invalidateQueries('feedback', feedback);
    },
  });

  const addToLiked = useMutation((user) => userService.editUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries('feedbackList');
      queryClient.invalidateQueries('user');
    },
  });

  const addVoteObj = {
    id: feedback?.id,
    upvotes: feedback?.upvotes + 1,
  };

  const removeVoteObj = {
    id: feedback?.id,
    upvotes: feedback?.upvotes - 1,
  };

  const likedObj = {
    id: serverUser?.id,
    liked: feedback?.id,
  };

  const handleUpvote = () => {
    addToLiked.mutate(likedObj);
    if (serverUser?.liked.some((like) => like === feedback?.id)) {
      upVote.mutate(removeVoteObj);
    }
    if (!serverUser?.liked.some((like) => like.toString() === feedback?.id)) {
      upVote.mutate(addVoteObj);
    }
  };

  const likeBg = serverUser?.liked.some((like) => like === feedback?.id) && '#4661e6';
  const likeColor = serverUser?.liked.some((like) => like === feedback?.id) && '#ffffff';

  return (
    <Button onClick={handleUpvote} bg={likeBg} color={likeColor}>
      <Arrow />
      {feedback?.upvotes}
    </Button>
  );
};

export default Upvotes;

// Upvotes.propTypes = {
//   number: PropTypes.number.isRequired,
// };
