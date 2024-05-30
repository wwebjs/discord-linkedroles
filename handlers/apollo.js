import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core/index.js';
import config from '../src/config.js';

const GET_USER_CONTRIBUTIONS = gql`
  query($owner: String!, $name: String!, $user: ID!) {
    repository(owner: $owner, name: $name) {
      ref(qualifiedName: "main") {
        target {
          ... on Commit {
            history(author: {id: $user}) {
              totalCount
            }
          }
        }
      }
    }
  }
`;

const GET_USER_ID = gql`
  query($login: String!) {
    user(login: $login) {
      id
    }
  }
`;

class Github {
  constructor() {
    this.client = new ApolloClient({
      uri: 'https://api.github.com/graphql',
      headers: {
        Authorization: `Bearer ${config.GITHUB_TOKEN}`
      },
      cache: new InMemoryCache()
    });
  }

  async getUserContributions(repository, username) {
    const [owner, name] = repository.split('/');
    try {
      const { data } = await this.client.query({
        query: GET_USER_CONTRIBUTIONS,
        variables: { owner, name, user: username }
      });

      if (!data.repository.ref) {
        return null;
      }

      return data.repository.ref.target.history.totalCount;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async getUserId(username) {
    try {
      const { data } = await this.client.query({
        query: GET_USER_ID,
        variables: { login: username }
      });

      return data.user.id;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async getLibContributions(username) {
    const userId = await this.getUserId(username);
    return this.getUserContributions(config.GITHUB_LIBRARY_REPO_MAIN, userId);
  }

  async getGuideContributions(username) {
    const userId = await this.getUserId(username);
    return this.getUserContributions(config.GITHUB_LIBRARY_REPO_GUIDE, userId);
  }
}

export default Github;