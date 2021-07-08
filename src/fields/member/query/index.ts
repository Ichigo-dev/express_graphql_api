import { GraphQLList } from 'graphql';
import { getMemberList } from '@/fields/member/resolvers';
import { memberType } from '@/fields/member/types';

export const memberQuery = {
  memberList: {
    type: new GraphQLList(memberType),
    description: 'Get list of member data',
    resolve: getMemberList
  }
};
