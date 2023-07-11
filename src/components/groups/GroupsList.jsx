import React, { useEffect, useState } from 'react'
import Loader from '../../commonComponent/Loader';
import { getGroupsListData } from '../../services/GroupsService'
import MessageList from './MessageList';

function GroupsList({grpSearch, setSelectedGroup, selectedGroup}) {
    let [grpList, setGrpList] = useState([])
    let [filteredGrpList, setFilteredGrpList] = useState([])
    let [loader, setLoader] = useState(true)
    let getGroups = async () => {
        try {
            let groupList = await getGroupsListData()
            setLoader(false)
            groupList?.reverse();
            setGrpList(groupList || []);
            setSelectedGroup(groupList.length ? groupList[0] : {})
        } catch (e) {
            console.log(e,'error')
        }
    }

    useEffect(() => {
        getGroups()
    }, [])

    let handleOnClick = (item) =>{
        console.log(item)
        setSelectedGroup(item)
    }

    useEffect(()=>{
        if(grpSearch != ''){
          const result = grpList.filter((value) => {
            return value?.title?.toLowerCase()?.includes(grpSearch?.toLowerCase())
          });
          setSelectedGroup(result[0] || {})
          setFilteredGrpList(result);
        }
        else{
          setFilteredGrpList(grpList);
          setSelectedGroup(grpList[0] || {})
        }
    },[grpSearch, grpList])

    return (
        <div style={{overflow: "hidden", overflowY: "auto", height: "415px"}}>
            {filteredGrpList?.length == 0 ? (
                <Loader visible={loader} textClassName={`mt-0 text-center`} showBR={false} emptyTextKey={`noData`} mainClassName={`active_n0data2`} />
            ) : filteredGrpList?.map((item) => {
                return <MessageList item={item} onClick={handleOnClick} selectedGroup={selectedGroup} />
            })}
        </div>
    )
}

export default GroupsList