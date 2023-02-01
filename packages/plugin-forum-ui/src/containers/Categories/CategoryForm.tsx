import React from 'react';
import { useQuery } from 'react-apollo';
import { queries, mutations } from '../../graphql';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { IRouterProps } from '@erxes/ui/src/types';
import * as compose from 'lodash.flowright';
import { IButtonMutateProps } from '@erxes/ui/src/types';
import ButtonMutate from '@erxes/ui/src/components/ButtonMutate';
import { withProps } from '@erxes/ui/src/utils';
import CategoryForm from '../../components/categories/CategoryForm';
import { ICategory } from '../../types';

type Props = {
  category?: ICategory;
  closeModal: () => void;
} & IRouterProps;

function CategoryFormContainer({ closeModal, category }: Props) {
  const { data, loading, error } = useQuery(
    gql(queries.categoryPossibleParents),
    {
      variables: {
        _id: category ? category._id : null
      }
    }
  );

  if (loading) {
    return null;
  }

  if (error) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
  }

  const { forumCategoryPossibleParents } = data;

  const renderButton = ({
    name,
    values,
    isSubmitted,
    callback,
    object
  }: IButtonMutateProps) => {
    return (
      <ButtonMutate
        mutation={
          object._id ? mutations.updateCategory : mutations.createCategory
        }
        variables={values}
        callback={callback}
        refetchQueries={[
          {
            query: gql(queries.categoriesByParentIds),
            variables: { parentId: [null] }
          }
        ]}
        isSubmitted={isSubmitted}
        type="submit"
        successMessage={`You successfully ${
          object._id ? 'updated' : 'added'
        } a ${name}`}
      />
    );
  };

  return (
    <CategoryForm
      category={category}
      categories={forumCategoryPossibleParents}
      renderButton={renderButton}
      closeModal={closeModal}
    />
  );
}

const getRefetchQueries = () => {
  return [
    {
      query: gql(queries.forumPostsQuery)
    }
  ];
};

export default withProps<{}>(
  compose()(withRouter<Props>(CategoryFormContainer))
);
